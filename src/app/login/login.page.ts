import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  // Default admin credentials
  defaultAdminEmail: string = 'medi@pharm.com';
  defaultAdminPassword: string = '@MediP1234';

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private controller: NavController,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastController: ToastController // Inject ToastController
  ) {}

  ngOnInit() {
     // TODO: Implement ngOnInit lifecycle method
    // This is a placeholder comment to avoid lint errors
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  async login() {
    // Email validation
    if (this.email.trim() === '') {
      this.presentToast('Please enter your email address', 'danger');
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.presentToast('Please enter a valid email address', 'danger');
      return;
    }

    // Password validation
    if (this.password.trim() === '') {
      this.presentToast('Please enter your password', 'danger');
      return;
    }

    const loader = await this.loadingController.create({
      message: 'Logging in...',
      cssClass: 'custom-loader-class',
    });
    await loader.present();

    // Check if the user is trying to log in with the default admin credentials
    if (this.email === this.defaultAdminEmail && this.password === this.defaultAdminPassword) {
      loader.dismiss();
      this.router.navigate(['/user-role']);
      return;
    }

    // Query Firestore to find the document with the matching email
    const userQuerySnapshot = await firebase
      .firestore()
      .collection('Users')
      .where('email', '==', this.email)
      .get();

    if (userQuerySnapshot.empty) {
      loader.dismiss();
      this.presentToast('User does not exist', 'danger');
      return;
    }

    // Since email is unique, there should be only one document in the query snapshot
    const userData = userQuerySnapshot.docs[0].data();

    if (userData) {
      if (userData['status'] === 'active') {
        this.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            loader.dismiss();
            const user = userCredential.user;
            // Role-based navigation
            switch (userData['role']) {
              case 'Customer':
                this.router.navigate(['/home-second']).then(() => {window.location.reload();});
                break;
              case 'Pharmacy':
                this.router.navigate(['/pharmacy']).then(() => {window.location.reload();});
                break;
              case 'Driver':
                this.router.navigate(['/driver']).then(() => {window.location.reload();});
                break;
              case 'Dispatcher':
                this.router.navigate(['/dispatcher']).then(() => {window.location.reload();});
                break;
              default:
                this.router.navigate(['/home']);
                break;
            }
          })
          .catch((error) => {
            loader.dismiss();
            const errorMessage = error.message;
            if (errorMessage.includes('wrong-password')) {
              this.presentToast('Incorrect password', 'danger');
            } else {
              this.presentToast(errorMessage, 'danger');
            }
          });
      } else if (userData['status'] === 'denied') {
        loader.dismiss();
        this.presentToast('You are not allowed in the system', 'danger');
      } else if (userData['status'] === 'pending') {
        loader.dismiss();
        this.presentToast(
          'Your account is pending. Please wait for admin approval.',
          'warning'
        );
        // Redirect to profile page
        this.router.navigate(['/profile']);
      } else {
        loader.dismiss();
        this.presentToast('You are not allowed in the system', 'danger');
      }
    }
  }

  goHomePage() {
    this.router.navigate(['/home']);
  }
}
