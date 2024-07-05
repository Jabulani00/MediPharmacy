import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-approval-modal',
  templateUrl: './approval-modal.component.html',
  styleUrls: ['./approval-modal.component.scss'],
})
export class ApprovalModalComponent {
  @Input() email!: string;
  @Input() message: string = 'Your account is now active and is ready for use';

  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore,
    private emailService: EmailService
  ) {}

  sendApprovalEmail() {
    const usersRef = this.firestore.collection('Users', ref =>
      ref.where('email', '==', this.email)
    );

    usersRef.get().toPromise().then(querySnapshot => {
      if (querySnapshot && !querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDocRef = this.firestore.collection('Users').doc(docId);

        userDocRef.update({ status: 'active' })
          .then(() => {
            console.log('User approved successfully');
            const templateParams = {
              to_email: this.email,
              message: this.message
            };

            this.emailService.sendEmail(templateParams)
              .then(() => {
                console.log('Approval email sent successfully');
                this.modalController.dismiss({
                  sendEmail: true,
                  message: this.message
                });
              })
              .catch(error => {
                console.error('Failed to send approval email:', error);
              });
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
      } else {
        console.error('User document with the provided email does not exist');
      }
    }).catch(error => {
      console.error('Error fetching user document:', error);
    });
  }

  cancel() {
    this.modalController.dismiss({
      sendEmail: false
    });
  }
}
