import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.checkDriverAssignment();
    this.updateDeliveryProgress();
  }

  checkDriverAssignment() {
    setTimeout(() => {
      this.hasDelivery = true;
      this.deliveryAddress = '123 Main St, Anytown, USA';
      this.driverStatus = 'shipping';
    }, 2000);
  }

  updateDeliveryProgress() {
    const interval = setInterval(() => {
      if (this.deliveryProgress < 100) {
        this.deliveryProgress += 5;
        this.currentStep = Math.floor(this.deliveryProgress / 25);
      } else {
        clearInterval(interval);
        this.hasDelivery = false;
        this.driverStatus = 'available';
      }
    }, 2000);
  }

  toggleStatusForm() {
    this.showStatusForm = !this.showStatusForm;
  }

  updateDriverStatus(status: string) {
    this.driverStatus = status;
    this.showStatusForm = false;
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
}
