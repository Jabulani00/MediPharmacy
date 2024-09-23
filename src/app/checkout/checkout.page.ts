import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;
  userEmail: string | null = null;
  bankForm: FormGroup;

  banks: string[] = ['Capitec', 'FNB', 'Standard Bank', 'Nedbank', 'TymeBank', 'ABSA'];

  constructor(
    private cartService: CartServiceService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {
    this.bankForm = this.formBuilder.group({
      bankType: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      cardHolderName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]]
    });
  }

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
        this.calculateTotalAmount();
      });
    }
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  async proceedToPayment() {
    if (this.bankForm.valid) {
      console.log('Proceeding to payment with:', this.bankForm.value);
      
      // Display thank you message
      await this.showToast('Thank you for your purchase!');

      // Move items to order history
      this.cartService.moveToOrderHistory(this.userEmail, this.cartItems).then(() => {
        // Clear cart after moving items
        this.cartService.clearCart(this.userEmail).then(() => {
          this.cartItems = []; // Clear cart items in the component
          this.router.navigate(['/order-history']); // Redirect to order history page
        });
      }).catch(error => {
        console.error('Error moving items to order history:', error);
      });
    } else {
      console.error('Form is not valid');
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  get bankType() {
    return this.bankForm.get('bankType');
  }

  get accountNumber() {
    return this.bankForm.get('accountNumber');
  }

  get cardHolderName() {
    return this.bankForm.get('cardHolderName');
  }
}
