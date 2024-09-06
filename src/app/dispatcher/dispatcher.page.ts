import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js/auto';

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
  orderDelivery: string;
}

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.page.html',
  styleUrls: ['./dispatcher.page.scss'],
})
export class DispatcherPage implements OnInit, AfterViewInit {
  @ViewChild('driverStatusChart') driverStatusChart?: ElementRef;
  @ViewChild('medicationRequestsChart') medicationRequestsChart?: ElementRef;

  selectedSegment: string = 'dashboard';
  drivers$: Observable<Driver[]>;
  medications$: Observable<Medication[]>;
  selectedDriver: Driver | null = null;

  driverStats = {
    pending: 5,
    active: 25,
    denied: 10
  };

  medicationStats = {
    total: 0,
    delivered: 0,
    inProgress: 0
  };

  constructor(private firestore: AngularFirestore) {
    this.drivers$ = this.firestore.collection<Driver>('Users', ref => ref.where('role', '==', 'Driver'))
      .valueChanges({ idField: 'id' }) as Observable<Driver[]>;
    this.medications$ = this.firestore.collection<Medication>('medications')
      .valueChanges({ idField: 'id' }) as Observable<Medication[]>;
  }

  ngOnInit() {
    this.loadStats();
  }

  ngAfterViewInit() {
    this.createCharts();
  }

  loadStats() {
    this.drivers$.subscribe(drivers => {
      this.driverStats.active = drivers.filter(d => d.status === 'available' || d.status === 'on delivery').length;
      this.driverStats.pending = drivers.filter(d => d.status === 'off duty').length;
      this.driverStats.denied = drivers.filter(d => d.status === 'finished').length;
      this.updateDriverChart();
    });

    this.medications$.subscribe(medications => {
      this.medicationStats.total = medications.length;
      this.medicationStats.delivered = medications.filter(m => m.orderDelivery === 'delivered').length;
      this.medicationStats.inProgress = medications.filter(m => m.orderDelivery === 'driver fetching').length;
      this.updateMedicationChart();
    });
  }

  createCharts() {
    if (this.driverStatusChart && this.medicationRequestsChart) {
      new Chart(this.driverStatusChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Pending', 'Denied'],
        datasets: [{
          data: [this.driverStats.active, this.driverStats.pending, this.driverStats.denied],
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
        }]
      }
    });

    new Chart(this.medicationRequestsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Total', 'Delivered', 'In Progress'],
        datasets: [{
          label: 'Medication Requests',
          data: [this.medicationStats.total, this.medicationStats.delivered, this.medicationStats.inProgress],
          backgroundColor: ['#4BC0C0', '#36A2EB', '#FFCE56']
        }]
      }
    });
  }
  }

  updateDriverChart() {
    if (this.driverStatusChart) {
      const chart = Chart.getChart(this.driverStatusChart.nativeElement);
      if (chart) {
        chart.data.datasets[0].data = [this.driverStats.active, this.driverStats.pending, this.driverStats.denied];
        chart.update();
      }
    }
  }

  updateMedicationChart() {
    if (this.medicationRequestsChart) {
      const chart = Chart.getChart(this.medicationRequestsChart.nativeElement);
      if (chart) {
        chart.data.datasets[0].data = [this.medicationStats.total, this.medicationStats.delivered, this.medicationStats.inProgress];
        chart.update();
      }
    }
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
          this.firestore.collection('Users').doc(this.selectedDriver!.id).update({
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