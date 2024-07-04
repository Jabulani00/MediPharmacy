import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  pendingUsers: any[] = [];

  constructor(
    private db: AngularFirestore,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadPendingUsers();
  }

  async loadPendingUsers() {
    const loader = await this.loadingController.create({
      message: 'Loading pending users...',
    });
    await loader.present();

    this.db.collection('Users', ref => ref.where('status', '==', 'pending')).snapshotChanges().subscribe(data => {
      this.pendingUsers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      });
      loader.dismiss();
    });
  }

  async approveUser(user: any) {
    const loader = await this.loadingController.create({
      message: 'Approving user...',
    });
    await loader.present();

    try {
      await this.db.collection('Users').doc(user.id).update({ status: 'active' });
      loader.dismiss();
      this.presentAlert('User approved successfully');
    } catch (error: any) { // Explicitly typing error as any
      loader.dismiss();
      this.presentAlert('Error approving user: ' + error.message);
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
