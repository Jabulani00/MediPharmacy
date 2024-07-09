import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs'; 

interface Medication {
  id?: string;
  name: string;
  type: string;
  description?: string;
  price: number;
  prescriptionRequired: boolean;
  size: string;
  discount: number;
  quantity: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.page.html',
  styleUrls: ['./pharmacy.page.scss'],
})
export class PharmacyPage implements OnInit {

  selectedCard: string = '';
  segment: string = 'form';
  medications: Medication[] = [];
  medForm!: FormGroup;
  selectedFile: File | null = null;
  editMode: boolean = false;
  editId: string | null = null;
  editFileUrl: string | null = null;

  medications$: Observable<Medication[]>;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.medications$ = this.loadMedications();
  }
  loadMedications(): Observable<Medication[]> {
    return this.firestore.collection<Medication>('medications').valueChanges({ idField: 'id' });
  }
  ngOnInit() {
    this.initForm();
    this.loadMedications();
  }

  initForm() {
    this.medForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      prescriptionRequired: [false],
      size: ['', Validators.required],
      discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
    });
  }

  selectCard(card: string) {
    this.selectedCard = card;
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

 

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message: message,
      cssClass: 'custom-loading'
    });
    await loading.present();
    return loading;
  }

  async onSubmit() {
    if (!this.medForm.valid) {
      return;
    }

    const loading = await this.presentLoading('Processing...');
    const formValue = this.medForm.value;

    try {
      if (this.editMode) {
        await this.updateMedication(formValue);
      } else {
        await this.addMedication(formValue);
      }
    } finally {
      await loading.dismiss();
    }
  }

  async addMedication(formValue: Medication) {
    try {
      const filePath = `medications/${new Date().getTime()}_${this.selectedFile?.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);

      await task.snapshotChanges().toPromise();
      const downloadURL = await fileRef.getDownloadURL().toPromise();

      await this.firestore.collection('medications').add({
        ...formValue,
        image: filePath,
        imageUrl: downloadURL,
      });

      this.showToast('Medication added successfully');
      this.resetForm();
    } catch (error) {
      console.error('Error adding medication:', error);
      this.showToast('Error adding medication');
    }
  }

  async updateMedication(formValue: Medication) {
    if (!this.editId) {
      return;
    }
  
    const loading = await this.presentLoading('Updating Medication...');
  
    try {
      let imageUrl = this.editFileUrl ?? undefined;  // Use nullish coalescing
  
      if (this.selectedFile) {
        // A new file was selected, so upload it
        const filePath = `medications/${new Date().getTime()}_${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedFile);
        
        await task.snapshotChanges().toPromise();
        imageUrl = await fileRef.getDownloadURL().toPromise();
  
        // Delete the old image if it exists
        if (this.editFileUrl) {
          try {
            await this.storage.refFromURL(this.editFileUrl).delete().toPromise();
          } catch (deleteError) {
            console.error('Error deleting old image:', deleteError);
            // Continue with the update even if delete fails
          }
        }
      }
  
      const medicationRef = this.firestore.collection('medications').doc(this.editId);
      const medicationSnapshot = await medicationRef.get().toPromise();
  
      if (medicationSnapshot && medicationSnapshot.exists) {
        const medicationData = medicationSnapshot.data() as Medication;
        const updatedQuantity = (medicationData.quantity || 0) + formValue.quantity;
  
        await medicationRef.update({
          ...formValue,
          imageUrl, // This will be either the new URL, the existing one, or undefined
          quantity: updatedQuantity,
        });
  
        this.showToast('Medication updated successfully');
        this.resetForm();
      } else {
        throw new Error('Medication not found');
      }
    } catch (error) {
      console.error('Error updating medication:', error);
      this.showToast('Error updating medication');
    } finally {
      await loading.dismiss();
    }
  }
  editMedication(med: Medication) {
    this.segment = 'form';
    this.editMode = true;
    this.editId = med.id ?? null;
    this.editFileUrl = med.imageUrl ?? null;  // Use nullish coalescing
  
    this.medForm.patchValue({
      name: med.name,
      type: med.type,
      description: med.description,
      price: med.price,
      prescriptionRequired: med.prescriptionRequired,
      size: med.size,
      discount: med.discount,
      quantity: 0, // Set to 0 as we're adding to the existing quantity
    });
  
    // Reset the file input
    this.selectedFile = null;
    // You might need to reset the file input in the HTML as well
    // You can do this by adding #fileInput to your file input element and then:
    // const fileInput: HTMLInputElement = this.elementRef.nativeElement.querySelector('#fileInput');
    // if (fileInput) fileInput.value = '';
  }
  async deleteMedication(med: Medication) {
    const loading = await this.presentLoading('Deleting Medication...');

    try {
      await this.firestore.collection('medications').doc(med.id).delete();
      if (med.imageUrl) {
        await this.storage.refFromURL(med.imageUrl).delete().toPromise();
      }
      this.showToast('Medication deleted successfully');
    } catch (error) {
      console.error('Error deleting medication:', error);
      this.showToast('Error deleting medication');
    } finally {
      await loading.dismiss();
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  resetForm() {
    this.medForm.reset();
    this.selectedFile = null;
    this.editMode = false;
    this.editId = null;
    this.editFileUrl = null;
  }
}