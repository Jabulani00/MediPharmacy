import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { UserDocumentsModalComponent } from '../user-documents-modal/user-documents-modal.component';
import { ApprovalModalComponent } from '../approval-modal/approval-modal.component';
import { DeclineModalComponent } from '../decline-modal/decline-modal.component';
import { EmailService } from '../services/email.service';

interface User {
  email: string;
  name: string;
  role: string;
  status: string;
  vehicleDoc?: string;
  licenseDoc?: string;
  pdpDoc?: string;
  registrationDoc?: string;
  certificateDoc?: string;
  proofOfAddressDoc?: string;
}

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.page.html',
  styleUrls: ['./user-role.page.scss'],
})
export class UserRolePage implements OnInit {

  users!: Observable<User[]>;

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    private emailService: EmailService
  ) { }

  ngOnInit() {
    this.users = this.firestore.collection<User>('Users').valueChanges();
  }

  async openUserDocumentsModal(user: User) {
    const modal = await this.modalController.create({
      component: UserDocumentsModalComponent,
      componentProps: {
        user: user
      }
    });
    return await modal.present();
  }

  async approveUser(user: User) {
    const modal = await this.modalController.create({
      component: ApprovalModalComponent,
      componentProps: {
        email: user.email,
        message: 'Your account is now active and is ready for use'
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data.sendEmail) {
        const templateParams = {
          to_email: user.email,
          message: result.data.message
        };

        this.emailService.sendEmail(templateParams)
          .then(() => {
            console.log('Approval email sent successfully');
          })
          .catch((error) => {
            console.error('Failed to send approval email:', error);
          });
      }
    });

    return await modal.present();
  }

  async declineUser(user: User) {
    const modal = await this.modalController.create({
      component: DeclineModalComponent,
      componentProps: {
        email: user.email
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data.sendEmail) {
        const templateParams = {
          to_email: user.email,
          message: result.data.message
        };

        this.emailService.sendEmail(templateParams)
          .then(() => {
            console.log('Decline email sent successfully');
          })
          .catch((error) => {
            console.error('Failed to send decline email:', error);
          });
      }
    });

    return await modal.present();
  }
}
