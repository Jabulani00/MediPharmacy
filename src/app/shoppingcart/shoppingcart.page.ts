import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.page.html',
  styleUrls: ['./shoppingcart.page.scss'],
})
export class ShoppingcartPage implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;
  userEmail: string | null = null;

  constructor(
    private cartService: CartServiceService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.loadCartItems();
      }
    });
  }

  loadCartItems() {
    if (this.userEmail) {
      this.cartService.getCartItems(this.userEmail).subscribe(items => {
        this.cartItems = items;
        this.totalAmount = this.getTotalAmount(); // Update total amount when items are loaded
      });
    }
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  increaseQuantity(item: any) {
    if (this.userEmail) {
      this.cartService.updateQuantity(this.userEmail, item.product, item.quantity + 1); // Assume this method is synchronous
      this.loadCartItems(); // Reload items after updating quantity
    }
  }

  decreaseQuantity(item: any) {
    if (this.userEmail && item.quantity > 1) {
      this.cartService.updateQuantity(this.userEmail, item.product, item.quantity - 1); // Assume this method is synchronous
      this.loadCartItems(); // Reload items after updating quantity
    }
  }

  removeItem(item: any) {
    if (this.userEmail) {
      this.cartService.removeItem(this.userEmail, item.product.id); // Assume this method is synchronous
      this.loadCartItems(); // Reload the cart items after removal
    }
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
