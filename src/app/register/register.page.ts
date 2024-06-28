import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  selectedRole: string = '';

  // Additional fields for document uploads
  vehicleDoc: File | null = null;
  licenseDoc: File | null = null;
  pdpDoc: File | null = null;
  registrationDoc: File | null = null;
  certificateDoc: File | null = null;
  proofOfAddressDoc: File | null = null;
  dispatcherId: string = '';
  dispatcherSystemId: string = '';

  constructor(
    private db: AngularFirestore,
    private Auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async Register() {
    if (this.name == '') {
      this.presentAlert("Enter your full name");
      return;
    }
    if (this.email == '') {
      this.presentAlert("Enter email Address");
      return;
    }
    if (this.password == '') {
      this.presentAlert("Enter password");
      return;
    }
    if (this.password !== this.confirm_password) {
      this.presentAlert("Passwords do not match");
      return;
    }
    if (this.selectedRole == '') {
      this.presentAlert("Please select a role");
      return;
    }

    // Validate role-specific documents
    if (this.selectedRole === 'Driver' && (!this.vehicleDoc || !this.licenseDoc || !this.pdpDoc)) {
      this.presentAlert("Please upload all required documents for Driver role");
      return;
    }
    if (this.selectedRole === 'Pharmacy' && (!this.registrationDoc || !this.certificateDoc || !this.proofOfAddressDoc)) {
      this.presentAlert("Please upload all required documents for Pharmacy role");
      return;
    }
    if (this.selectedRole === 'Dispatcher' && (!this.dispatcherId || !this.dispatcherSystemId)) {
      this.presentAlert("Please enter Dispatcher ID and System ID");
      return;
    }

    const loader = await this.loadingController.create({
      message: 'Registering you...',
      cssClass: 'custom-loader-class'
    });

    await loader.present();

    try {
      const userCredential = await this.Auth.createUserWithEmailAndPassword(this.email, this.password);
      if (userCredential.user) {
        const userData: any = {
          name: this.name,
          email: this.email,
          status: "pending",
          role: this.selectedRole,
        };

        // Add role-specific data
        if (this.selectedRole === 'Driver') {
          userData.vehicleDoc = this.vehicleDoc ? await this.uploadFile(this.vehicleDoc) : null;
          userData.licenseDoc = this.licenseDoc ? await this.uploadFile(this.licenseDoc) : null;
          userData.pdpDoc = this.pdpDoc ? await this.uploadFile(this.pdpDoc) : null;
        } else if (this.selectedRole === 'Pharmacy') {
          userData.registrationDoc = this.registrationDoc ? await this.uploadFile(this.registrationDoc) : null;
          userData.certificateDoc = this.certificateDoc ? await this.uploadFile(this.certificateDoc) : null;
          userData.proofOfAddressDoc = this.proofOfAddressDoc ? await this.uploadFile(this.proofOfAddressDoc) : null;
        } else if (this.selectedRole === 'Dispatcher') {
          userData.dispatcherId = this.dispatcherId;
          userData.dispatcherSystemId = this.dispatcherSystemId;
        }

        await this.db.collection('Users').add(userData);
        loader.dismiss();
        console.log('User data added successfully');
        this.router.navigate(['/profile']);
      }
    } catch (error: any) {
      loader.dismiss();
      console.error('Error during registration:', error);
      this.presentAlert(error.message);
    }
  }

  async uploadFile(file: File): Promise<string> {
    const filePath = `documents/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    try {
      await task;
      const downloadURL = await fileRef.getDownloadURL().toPromise();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  onFileSelected(event: any, docType: string) {
    const file = event.target.files[0];
    switch (docType) {
      case 'vehicle':
        this.vehicleDoc = file;
        break;
      case 'license':
        this.licenseDoc = file;
        break;
      case 'pdp':
        this.pdpDoc = file;
        break;
      case 'registration':
        this.registrationDoc = file;
        break;
      case 'certificate':
        this.certificateDoc = file;
        break;
      case 'proofOfAddress':
        this.proofOfAddressDoc = file;
        break;
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