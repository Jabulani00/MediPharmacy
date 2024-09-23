import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {

  orders: any[] = [];
  userEmail: string | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.loadOrderHistory();
      }
    });
  }

  loadOrderHistory() {
    if (this.userEmail) {
      this.cartService.getOrderHistory(this.userEmail).subscribe(orders => {
        this.orders = orders;
      });
    }
  }

  calculateTotal(order: any): number {
    return order.items.reduce((total: number, item: any) => total + (item.product.price * item.quantity), 0);
  }
}
