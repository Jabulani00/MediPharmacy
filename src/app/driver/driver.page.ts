import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

interface Medication {
  id: string;
  name: string;
  description?: string;
  price?: number;
  quantity?: number;
  imageUrl?: string;
  deliveryAddress?: string;
  // Add any other properties that might be present in your medication documents
}

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {
  driverStatus: string = 'available';
  deliveryProgress: number = 0;
  hasDelivery: boolean = false;
  deliveryAddress: string = '';
  deliverySteps: string[] = ['Collecting', 'On the Way', 'Nearly There', 'Arrived'];
  currentStep: number = 0;
  statuses: string[] = ['available', 'shipping', 'on_leave', 'health_issue', 'vehicle_issue'];
  showStatusForm: boolean = false;
  selectedStatus: string = 'available';
  medications: Medication[] = [];
  currentUserEmail: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user && user.email) {
        this.currentUserEmail = user.email;
        this.fetchMedications(user.email);
      }
    });
    this.updateDeliveryProgress();
  }

  fetchMedications(driverEmail: string) {
    this.firestore.collection<Medication>('medications', ref => ref.where('driver', '==', driverEmail))
      .valueChanges({ idField: 'id' })
      .subscribe(medications => {
        this.medications = medications;
        this.hasDelivery = medications.length > 0;
        if (this.hasDelivery) {
          this.deliveryAddress = medications[0].deliveryAddress || 'Address not available';
          this.driverStatus = 'shipping';
        } else {
          this.driverStatus = 'available';
          this.deliveryAddress = '';
        }
      });
  }

  updateDeliveryProgress() {
    const interval = setInterval(() => {
      if (this.deliveryProgress < 100 && this.hasDelivery) {
        this.deliveryProgress += 5;
        this.currentStep = Math.floor(this.deliveryProgress / 25);
      } else {
        clearInterval(interval);
        this.deliveryProgress = 0;
        this.currentStep = 0;
      }
    }, 2000);
  }

  toggleStatusForm() {
    this.showStatusForm = !this.showStatusForm;
  }

  async updateDriverStatus(status: string) {
    if (!this.currentUserEmail) {
      console.error('No user email found');
      return;
    }

    try {
      await this.firestore.collection('drivers').doc(this.currentUserEmail).update({
        status: status
      });
      this.driverStatus = status;
      this.showStatusForm = false;
    } catch (error) {
      console.error('Error updating driver status:', error);
      this.presentAlert('Error', 'Failed to update status. Please try again.');
    }
  }

  getStatusDegrees(): number {
    return this.statuses.indexOf(this.driverStatus) * 72;
  }

  getStatusLabel(status: string): string {
    return status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  getStepIcon(index: number): string {
    const icons = ['cart-outline', 'car-outline', 'map-outline', 'location-outline'];
    return icons[index];
  }

  async deliverMedication(medication: Medication) {
    if (!this.currentUserEmail) {
      console.error('No user email found');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirm Delivery',
      message: `Are you sure you want to mark ${medication.name} as delivered?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.processMedicationDelivery(medication);
          }
        }
      ]
    });

    await alert.present();
  }

  private async processMedicationDelivery(medication: Medication) {
    try {
      // Create a new document in the order-history collection
      await this.firestore.collection('order-history').add({
        ...medication,
        deliveredAt: new Date(),
        deliveredBy: this.currentUserEmail
      });

      // Remove the medication from the medications collection
      await this.firestore.collection('medications').doc(medication.id).delete();

      this.presentAlert('Success', `${medication.name} has been marked as delivered.`);
    } catch (error) {
      console.error('Error delivering medication:', error);
      this.presentAlert('Error', 'Failed to process delivery. Please try again.');
    }
  }

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}