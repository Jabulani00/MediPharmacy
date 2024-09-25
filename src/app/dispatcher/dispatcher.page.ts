import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js/auto';
import { AlertController } from '@ionic/angular';

interface Driver {
  id: string;
  name: string;
  status: 'available' | 'shipping' | 'on_leave' | 'health_issue' | 'vehicle_issue' | 'active';
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
  driver?: string;
  deliveryAddress?: string;
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
  availableMedications: Medication[] = [];
  availableDrivers: Driver[] = [];
  selectedMedication: Medication | null = null;

  driverStats = {
    available: 0,
    shipping: 0,
    unavailable: 0
  };

  medicationStats = {
    total: 0,
    delivered: 0,
    inProgress: 0
  };

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {
    this.drivers$ = this.firestore.collection<Driver>('Users', ref => ref.where('role', '==', 'Driver'))
      .valueChanges({ idField: 'id' }) as Observable<Driver[]>;
    this.medications$ = this.firestore.collection<Medication>('medications')
      .valueChanges({ idField: 'id' }) as Observable<Medication[]>;
  }

  ngOnInit() {
    this.loadStats();
    this.loadAvailableMedications();
    this.loadAvailableDrivers();
  }

  ngAfterViewInit() {
    this.createCharts();
  }

  loadStats() {
    this.drivers$.subscribe(drivers => {
      this.driverStats.available = drivers.filter(d => d.status === 'available').length;
      this.driverStats.shipping = drivers.filter(d => d.status === 'shipping').length;
      this.driverStats.unavailable = drivers.filter(d => ['on_leave', 'health_issue', 'vehicle_issue'].includes(d.status)).length;
      this.updateDriverChart();
    });

    this.medications$.subscribe(medications => {
      this.medicationStats.total = medications.length;
      this.medicationStats.delivered = medications.filter(m => m.orderDelivery === 'delivered').length;
      this.medicationStats.inProgress = medications.filter(m => m.orderDelivery === 'shipping').length;
      this.updateMedicationChart();
    });
  }

  createCharts() {
    if (this.driverStatusChart && this.medicationRequestsChart) {
      new Chart(this.driverStatusChart.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Available', 'Shipping', 'Unavailable'],
          datasets: [{
            data: [this.driverStats.available, this.driverStats.shipping, this.driverStats.unavailable],
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
        chart.data.datasets[0].data = [this.driverStats.available, this.driverStats.shipping, this.driverStats.unavailable];
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
      case 'shipping': return 'primary';
      case 'on_leave': return 'medium';
      case 'health_issue': return 'warning';
      case 'vehicle_issue': return 'danger';
      default: return 'medium';
    }
  }

 
  openDriverSelection(medication: Medication) {
    this.selectedMedication = medication;
  }

  
  loadAvailableMedications() {
    this.medications$.subscribe(medications => {
      this.availableMedications = medications.filter(m => !m.driver);
    });
  }

  loadAvailableDrivers() {
    this.drivers$.subscribe(drivers => {
      // Log the full list of drivers received
      console.log("All drivers fetched:", drivers);
      // Filter only available and shipping drivers
      this.availableDrivers = drivers.filter(d => d.status === 'active' || d.status === 'shipping');
      // Log the available drivers after filtering
      console.log("Available drivers after filtering:", this.availableDrivers);
      // Additional check if no drivers are available
      if (this.availableDrivers.length === 0) {
        console.warn("No available drivers found!");
      }
    }, error => {
      // Log an error if there is an issue fetching drivers
      console.error("Error fetching drivers:", error);
    });
  }
  
  

  async assignDelivery(medication: Medication, driverId: string) {
    const driver = this.availableDrivers.find(d => d.id === driverId);
    if (driver) {
      const updateData: Partial<Medication> = {
        driver: driver.email,
        orderDelivery: 'shipping',
      };

      try {
        await this.firestore.collection('medications').doc(medication.id).update(updateData);
        console.log(`Assigned ${medication.name} to ${driver.name}`);

        await this.firestore.collection('Users').doc(driver.id).update({
          status: 'shipping',
          deliveries: driver.deliveries + 1,
        });

        this.loadAvailableMedications();
        this.loadAvailableDrivers();

        const alert = await this.alertController.create({
          header: 'Success',
          message: `Assigned ${medication.name} to ${driver.name}`,
          buttons: ['OK']
        });
        await alert.present();
      } catch (error) {
        console.error('Error updating medication:', error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Failed to assign delivery. Please try again.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }



  cancelAssignment() {
    this.selectedMedication = null;
  }

  getDriverStatus(driver: Driver): string {
    return driver.status.replace('_', ' ');
  }
}