import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

interface Driver {
  id: string;
  name: string;
  status: 'available' | 'on delivery' | 'off duty' | 'finished';
  deliveries: number;
  avatar: string;
  email: string;
}

interface Medication {
  id: string;
  name: string;
  description: string;
  discount: number;
  imageUrl: string;
  price: number;
  quantity: number;
  size: string;
  type: string;
  prescriptionRequired: boolean;
}

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.page.html',
  styleUrls: ['./dispatcher.page.scss'],
})
export class DispatcherPage implements OnInit {
  selectedSegment: string = 'drivers';
  drivers$: Observable<Driver[]>;
  medications$: Observable<Medication[]>;
  selectedDriver: Driver | null = null;

  constructor(private firestore: AngularFirestore) {
    this.drivers$ = this.firestore.collection<Driver>('Users', ref => ref.where('role', '==', 'Driver'))
      .valueChanges({ idField: 'id' }) as Observable<Driver[]>;

    this.medications$ = this.firestore.collection<Medication>('medications')
      .valueChanges({ idField: 'id' }) as Observable<Medication[]>;
  }

  ngOnInit() {
    console.log('DispatcherPage initialized');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'available': return 'success';
      case 'on delivery': return 'primary';
      case 'off duty': return 'medium';
      case 'finished': return 'warning';
      default: return 'medium';
    }
  }

  assignDelivery(driver: Driver) {
    this.selectedDriver = driver;
  }

  confirmDelivery(medication: Medication) {
    if (this.selectedDriver) {
      const updateData = {
        driver: this.selectedDriver.email,
        orderDelivery: 'driver fetching',
      };

      this.firestore.collection('medications').doc(medication.id).update(updateData)
        .then(() => {
          console.log(`Assigned ${medication.name} to ${this.selectedDriver!.name}`);
          this.firestore.collection('users').doc(this.selectedDriver!.id).update({
            status: 'on delivery',
            deliveries: this.selectedDriver!.deliveries + 1,
          });
        })
        .catch(error => console.error('Error updating medication:', error));
    }

    this.selectedDriver = null; // Close the card after assigning
  }

  cancelAssignment() {
    this.selectedDriver = null; // Close the card without assigning
  }
}
