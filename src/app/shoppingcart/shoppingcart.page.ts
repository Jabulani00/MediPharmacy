import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.page.html',
  styleUrls: ['./shoppingcart.page.scss'],
})
export class ShoppingcartPage implements OnInit {

  cartItems: any[] = [];
  subtotal: number = 0;
  totalAmount: number = 0;
  userEmail: string | null = null;

  constructor(
    private cartService: CartServiceService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.loadCartItems();
      }
    });
  }

  // loadCartItems() {
  //   if (this.userEmail) {
  //     this.cartService.getCartItems(this.userEmail).subscribe(items => {
  //       this.cartItems = items;
  //       this.subtotal = this.cartService.getSubtotal(this.cartItems);
  //       this.totalAmount = this.subtotal; // Update if you have taxes or discounts
  //     });
  //   }
  // }

  loadCartItems() {
    if (this.userEmail) {
      this.cartService.getCartItems(this.userEmail).subscribe(items => {
        this.cartItems = items;
        this.subtotal = this.cartService.getSubtotal(this.cartItems);
        //this.calculateSubtotal();
      });
    }
  }

  // calculateSubtotal() {
  //   this.subtotal = this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  // }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  increaseQuantity(item: any) {
    if (this.userEmail) {
      this.cartService.updateQuantity(this.userEmail, item.product, item.quantity + 1);
      this.loadCartItems();
    }
  }

  decreaseQuantity(item: any) {
    if (this.userEmail && item.quantity > 1) {
      this.cartService.updateQuantity(this.userEmail, item.product, item.quantity - 1);
      this.loadCartItems();
    }
  }

  // removeItem(item: any) {
  //   if (this.userEmail) {
  //     this.cartService.removeItem(this.userEmail, item.product);
  //     this.loadCartItems();
  //   }
  // }

  removeItem(item: any) {
    if (this.userEmail) {
      this.cartService.removeItem(this.userEmail, item.product.id).then(() => {
        this.loadCartItems(); // Reload the cart items after removal
      }).catch(error => {
        console.error("Error removing item from cart: ", error);
      });
    }
  }

  proceedToCheckout() {
    // Implement checkout logic
  }
}
