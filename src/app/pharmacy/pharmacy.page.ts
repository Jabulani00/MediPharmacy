import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import localeZa from '@angular/common/locales/en-ZA';
import { IonModal } from '@ionic/angular';
import { Chart } from 'chart.js/auto';

registerLocaleData(localeZa);

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
  segment: string = 'dashboard';
  medications: Medication[] = [];
  medForm!: FormGroup;
  selectedFile: File | null = null;
  editMode: boolean = false;
  editId: string | null = null;
  editFileUrl: string | null = null;

  medications$: Observable<Medication[]>;
  @ViewChild('imageModal') imageModal!: IonModal;
  selectedImageUrl: string | null = null;
  selectedImageName: string | null = null; 

  dashboardStats: any = {};
  @ViewChild('medicationTypeChart') medicationTypeChart!: ElementRef;
  @ViewChild('prescriptionRequiredChart') prescriptionRequiredChart!: ElementRef;

  @ViewChild('medicationTypeQuantityChart') medicationTypeQuantityChart!: ElementRef;
  @ViewChild('prescriptionQuantityChart') prescriptionQuantityChart!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.medications$ = this.loadMedications();
    this.loadDashboardStats();
  }

  ngOnInit() {
    this.initForm();
    this.loadMedications();
  }

  ngAfterViewInit() {
    this.createCharts();
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

  loadMedications(): Observable<Medication[]> {
    return this.firestore.collection<Medication>('medications').valueChanges({ idField: 'id' });
  }

  loadDashboardStats() {
    this.medications$.pipe(
      map(medications => {
        const totalMeds = medications.length;
        const totalQuantity = medications.reduce((sum, med) => sum + med.quantity, 0);
        const prescriptionRequired = medications.filter(med => med.prescriptionRequired).length;
        const medicationTypes = this.getMedicationTypes(medications);
        const medicationTypeQuantities = this.getMedicationTypeQuantities(medications);
        const prescriptionQuantities = this.getPrescriptionQuantities(medications);

        return {
          totalMeds,
          totalQuantity,
          prescriptionRequired,
          medicationTypes,
          medicationTypeQuantities,
          prescriptionQuantities
        };
      })
    ).subscribe(stats => {
      this.dashboardStats = stats;
      this.createCharts();
    });
  }

  getMedicationTypeQuantities(medications: Medication[]): { [key: string]: number } {
    return medications.reduce((types, med) => {
      types[med.type] = (types[med.type] || 0) + med.quantity;
      return types;
    }, {} as { [key: string]: number });
  }

  getPrescriptionQuantities(medications: Medication[]): { prescription: number, nonPrescription: number } {
    return medications.reduce((result, med) => {
      if (med.prescriptionRequired) {
        result.prescription += med.quantity;
      } else {
        result.nonPrescription += med.quantity;
      }
      return result;
    }, { prescription: 0, nonPrescription: 0 });
  }
  getMedicationTypes(medications: Medication[]): { [key: string]: number } {
    return medications.reduce((types, med) => {
      types[med.type] = (types[med.type] || 0) + 1;
      return types;
    }, {} as { [key: string]: number });
  }

  createCharts() {
    if (this.dashboardStats.medicationTypes && this.medicationTypeChart) {
      new Chart(this.medicationTypeChart.nativeElement, {
        type: 'doughnut',
        data: {
          labels: Object.keys(this.dashboardStats.medicationTypes),
          datasets: [{
            data: Object.values(this.dashboardStats.medicationTypes),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Medication Types'
            }
          }
        }
      });
    }

    if (this.dashboardStats.prescriptionRequired !== undefined && this.prescriptionRequiredChart) {
      new Chart(this.prescriptionRequiredChart.nativeElement, {
        type: 'pie',
        data: {
          labels: ['Prescription Required', 'No Prescription'],
          datasets: [{
            data: [this.dashboardStats.prescriptionRequired, this.dashboardStats.totalMeds - this.dashboardStats.prescriptionRequired],
            backgroundColor: ['#FF6384', '#36A2EB']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Prescription Requirements'
            }
          }
        }
      });
    }
    this.createMedicationTypeQuantityChart();
    this.createPrescriptionQuantityChart();
  }
  createMedicationTypeQuantityChart() {
    if (this.dashboardStats.medicationTypeQuantities && this.medicationTypeQuantityChart) {
      const ctx = this.medicationTypeQuantityChart.nativeElement.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.dashboardStats.medicationTypeQuantities),
          datasets: [{
            label: 'Quantity',
            data: Object.values(this.dashboardStats.medicationTypeQuantities),
            backgroundColor: 'rgba(173, 217, 208, 0.7)',
            borderColor: 'rgba(173, 217, 208, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Medication Types Quantity'
            }
          }
        }
      });
    }
  }

  createPrescriptionQuantityChart() {
    if (this.dashboardStats.prescriptionQuantities && this.prescriptionQuantityChart) {
      const ctx = this.prescriptionQuantityChart.nativeElement.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Prescription', 'Non-Prescription'],
          datasets: [{
            label: 'Quantity',
            data: [
              this.dashboardStats.prescriptionQuantities.prescription,
              this.dashboardStats.prescriptionQuantities.nonPrescription
            ],
            backgroundColor: ['rgba(127, 191, 180, 0.7)', 'rgba(95, 166, 155, 0.7)'],
            borderColor: ['rgba(127, 191, 180, 1)', 'rgba(95, 166, 155, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Prescription vs Non-Prescription Quantity'
            }
          }
        }
      });
    }
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
      let imageUrl = this.editFileUrl ?? undefined;
  
      if (this.selectedFile) {
        const filePath = `medications/${new Date().getTime()}_${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedFile);
        
        await task.snapshotChanges().toPromise();
        imageUrl = await fileRef.getDownloadURL().toPromise();
  
        if (this.editFileUrl) {
          try {
            await this.storage.refFromURL(this.editFileUrl).delete().toPromise();
          } catch (deleteError) {
            console.error('Error deleting old image:', deleteError);
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
          imageUrl,
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
    this.editFileUrl = med.imageUrl ?? null;
  
    this.medForm.patchValue({
      name: med.name,
      type: med.type,
      description: med.description,
      price: med.price,
      prescriptionRequired: med.prescriptionRequired,
      size: med.size,
      discount: med.discount,
      quantity: 0,
    });
  
    this.selectedFile = null;
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

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-image.png';
  }

  openImageModal(imageUrl?: string, imageName?: string) {
    if (imageUrl && imageName) {
      this.selectedImageUrl = imageUrl;
      this.selectedImageName = imageName;
      this.imageModal.present();
    }
  }

  closeImageModal() {
    this.imageModal.dismiss();
  }
}