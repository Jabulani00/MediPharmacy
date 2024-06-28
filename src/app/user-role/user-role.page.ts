import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { UserDocumentsModalComponent } from '../user-documents-modal/user-documents-modal.component';

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
    private modalController: ModalController
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

  approveUser(user: User) {
    const usersRef = this.firestore.collection('Users', ref =>
      ref.where('email', '==', user.email)
    );
  
    usersRef.get().toPromise().then(querySnapshot => {
      if (querySnapshot && !querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDocRef = this.firestore.collection('Users').doc(docId);
  
        userDocRef.update({ status: 'active' })
          .then(() => console.log('User approved successfully'))
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
  
  declineUser(user: User) {
    const usersRef = this.firestore.collection('Users', ref =>
      ref.where('email', '==', user.email)
    );
  
    usersRef.get().toPromise().then(querySnapshot => {
      if (querySnapshot && !querySnapshot?.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDocRef = this.firestore.collection('Users').doc(docId);
  
        userDocRef.update({ status: 'denied' })
          .then(() => console.log('User declined successfully'))
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

}
