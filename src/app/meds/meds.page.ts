import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PrescriptionModalPage } from '../prescription-modal/prescription-modal.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

interface Medication {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  prescriptionRequired: boolean;
  imageUrl: string;
}

@Component({
  selector: 'app-meds',
  templateUrl: './meds.page.html',
  styleUrls: ['./meds.page.scss'],
})
export class MedsPage implements OnInit {
  medications: any[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    // Fetch medications from Firestore
    this.fetchMedications();
  }


  
  async fetchMedications() {
    try {
      const medsCollection = this.firestore.collection('medications');
      const snapshot = await medsCollection.get().toPromise();
      
      if (snapshot && !snapshot.empty) { // Ensure snapshot is defined and not empty
        this.medications = snapshot.docs.map(doc => {
          const data = doc.data() as Medication; // Assuming Medication interface or type is defined
          return {
            id: doc.id,
            name: data.name,
            type: data.type,
            description: data.description,
            price: data.price,
            prescriptionRequired: data.prescriptionRequired,
            imageUrl: data.imageUrl
          };
        });
      } else {
        console.log('No medications found');
      }
    } catch (error) {
      console.error('Error fetching medications:', error);
      this.showToast('Failed to fetch medications');
    }
  }
  
  
  async addToCart(medication: any) {
    if (medication.prescriptionRequired) {
      const modal = await this.modalController.create({
        component: PrescriptionModalPage,
        componentProps: { medication: medication },
      });
      await modal.present();
    } else {
      // Simulate adding to cart
      this.showToast(`${medication.name} added to cart`);
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
}
