import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-decline-modal',
  templateUrl: './decline-modal.component.html',
  styleUrls: ['./decline-modal.component.scss'],
})
export class DeclineModalComponent {
  @Input() email!: string;

  declineReasons: { reason: string, selected: boolean }[] = [
    { reason: 'Incomplete documents', selected: false },
    { reason: 'Invalid information', selected: false },
    { reason: 'Other', selected: false }
  ];

  otherReason: string = '';

  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore,
    private emailService: EmailService
  ) {}

  sendDeclineEmail() {
    const selectedReasons = this.declineReasons
      .filter(reason => reason.selected)
      .map(reason => reason.reason);

    if (this.otherReason) {
      selectedReasons.push(this.otherReason);
    }

    const message = `Your account has been declined for the following reasons: ${selectedReasons.join(', ')}`;

    const usersRef = this.firestore.collection('Users', ref =>
      ref.where('email', '==', this.email)
    );

    usersRef.get().toPromise().then(querySnapshot => {
      if (querySnapshot && !querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDocRef = this.firestore.collection('Users').doc(docId);

        userDocRef.update({ status: 'denied' })
          .then(() => {
            console.log('User declined successfully');
            const templateParams = {
              to_email: this.email,
              message: message
            };

            this.emailService.sendEmail(templateParams)
              .then(() => {
                console.log('Decline email sent successfully');
                this.modalController.dismiss({
                  sendEmail: true,
                  message: message
                });
              })
              .catch(error => {
                console.error('Failed to send decline email:', error);
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
