

import { Component, Input  } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-prescription-modal',
  templateUrl: './prescription-modal.page.html',
})
export class PrescriptionModalPage {
  @Input() medication: any; // Ensure @Input decorator is correctly imported
  selectedFile: File | null = null;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private storage: AngularFireStorage
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadPrescription() {
    if (!this.selectedFile) {
      this.showToast('Please select a file');
      return;
    }

    const filePath = `prescriptions/${new Date().getTime()}_${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);

    task.snapshotChanges().subscribe(
      async () => {
        const downloadURL = await fileRef.getDownloadURL().toPromise();
        // Save prescription URL to Firestore or handle as needed
        this.showToast('Prescription uploaded successfully');
        this.closeModal();
      },
      async (error) => {
        console.error('Error uploading prescription:', error);
        this.showToast('Error uploading prescription');
      }
    );
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
