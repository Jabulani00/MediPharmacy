import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  email: string = '';

  constructor(
    private auth: AngularFireAuth,
    private toastController: ToastController,
    private menu: MenuController,
    private platform: Platform
  ) {}

  ngOnInit() {}

  closeMenu(event: Event){
    this.menu.close('main-content');
    event.stopPropagation();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  async resetPassword() {
    if (!this.email) {
      this.presentToast('Enter your email', 'danger');
      return;
    }
  
    try {
      await this.auth.sendPasswordResetEmail(this.email);
      this.presentToast('Password reset email sent. Check your inbox.', 'success');
    } catch (error) {
      const errorMessage = (error as { message: string }).message; // Type assertion
      this.presentToast(errorMessage, 'danger');
    }
  }
  
}