import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.page.html',
  styleUrls: ['./pharmacy.page.scss'],
})
export class PharmacyPage implements OnInit {

  selectedCard: string = '';

  medForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  selectCard(card: string) {
    this.selectedCard = card;
  }

  ngOnInit() {
    this.medForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      prescriptionRequired: [false],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit() {
    if (!this.medForm.valid || !this.selectedFile) {
      return;
    }
  
    const loading = await this.loadingController.create({
      message: 'Adding Medication...',
    });
    await loading.present();
  
    const formValue = this.medForm.value;
    const filePath = `medications/${new Date().getTime()}_${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);
  
    task.snapshotChanges().subscribe(
      async () => {
        try {
          const downloadURL = await fileRef.getDownloadURL().toPromise();
          await this.firestore.collection('medications').add({
            name: formValue.name,
            type: formValue.type,
            description: formValue.description,
            price: formValue.price,
            prescriptionRequired: formValue.prescriptionRequired,
            image: filePath,
            imageUrl: downloadURL,
          });
          await loading.dismiss();
          this.showToast('Medication added successfully');
          this.medForm.reset();
          this.selectedFile = null;
        } catch (error) {
          console.error('Error adding medication:', error);
          await loading.dismiss();
          this.showToast('Error adding medication');
        }
      },
      async (error) => {
        console.error('File upload error:', error);
        await loading.dismiss();
        this.showToast('Error uploading file');
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
