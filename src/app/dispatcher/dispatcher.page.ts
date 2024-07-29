import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

interface Driver {
  id: number;
  name: string;
  status: 'available' | 'on delivery' | 'off duty' | 'finished';
  deliveries: number;
  avatar: string;
}

interface Item {
  id: number;
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.page.html',
  styleUrls: ['./dispatcher.page.scss'],
})
export class DispatcherPage implements OnInit {
  selectedSegment: string = 'drivers'; // Declare selectedSegment property

  drivers: Driver[] = [
    { id: 1, name: 'John Doe', status: 'available', deliveries: 5, avatar: 'assets/er.jpg' },
    { id: 2, name: 'Jane Smith', status: 'on delivery', deliveries: 3, avatar: 'assets/ffdg.jpg' },
    { id: 3, name: 'Mike Johnson', status: 'off duty', deliveries: 7, avatar: 'assets/er.jpg' },
    { id: 4, name: 'Emily Brown', status: 'finished', deliveries: 4, avatar: 'assets/ffdg.jpg' },
  ];

  items: Item[] = [
    { id: 1, name: 'Aspirin', quantity: 50 },
    { id: 2, name: 'Ibuprofen', quantity: 30 },
    { id: 3, name: 'Antibiotics', quantity: 20 },
    { id: 4, name: 'Vitamins', quantity: 40 },
  ];

  constructor() { }

  ngOnInit() {
    console.log('DispatcherPage initialized');
    this.createCharts();
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
    if (driver.status === 'available' && this.items.length > 0) {
      const item = this.items.pop();
      if (item) {
        console.log(`Assigning ${item.name} to ${driver.name}`);
        driver.status = 'on delivery';
        driver.deliveries++;
        this.createCharts();
      }
    }
  }

  getTotalDeliveries(): number {
    return this.drivers.reduce((total, driver) => total + driver.deliveries, 0);
  }

  getAvailableDrivers(): number {
    return this.drivers.filter(driver => driver.status === 'available').length;
  }

  createCharts() {
    this.createItemChart();
    this.createPerformanceChart();
  }

  createItemChart() {
    const itemChartElement = document.getElementById('itemChart') as HTMLCanvasElement;
    if (itemChartElement) {
      new Chart(itemChartElement, {
        type: 'bar',
        data: {
          labels: this.items.map(item => item.name),
          datasets: [{
            label: 'Item Quantity',
            data: this.items.map(item => item.quantity),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      } as ChartConfiguration);
    } else {
      console.error('Item chart canvas not found');
    }
  }

  createPerformanceChart() {
    const performanceChartElement = document.getElementById('performanceChart') as HTMLCanvasElement;
    if (performanceChartElement) {
      new Chart(performanceChartElement, {
        type: 'pie',
        data: {
          labels: this.drivers.map(driver => driver.name),
          datasets: [{
            data: this.drivers.map(driver => driver.deliveries),
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
            ],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Driver Performance',
              color: '#044a42',
              font: { size: 16, weight: 'bold' }
            },
            legend: {
              display: true
            }
          }
        }
      } as ChartConfiguration);
    } else {
      console.error('Performance chart canvas not found');
    }
  }
}
