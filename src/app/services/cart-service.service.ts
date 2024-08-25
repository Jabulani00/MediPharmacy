import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  description: string;
  //imageUrl;
}

interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  private cartCollection(userEmail: string | null) {
    if (!userEmail) throw new Error('User email is null');
    return this.firestore.collection('shoppingcart').doc(userEmail).collection('items');
  }

  addItem(userEmail: string | null, product: any, quantity: number): void {
    if (!userEmail) return;
    const cartItem = { product, quantity };
    this.cartCollection(userEmail).doc(product.id).set(cartItem);
  }

  removeItem(userEmail: string, productId: string): Promise<void> {
    return this.firestore
      .collection('cart')
      .doc(userEmail)
      .collection('items')
      .doc(productId)
      .delete();
  }

  getCartItems(userEmail: string | null): Observable<CartItem[]> {
    if (!userEmail) return new Observable<CartItem[]>(observer => observer.next([]));
    return this.cartCollection(userEmail).valueChanges() as Observable<CartItem[]>;
  }

  // removeItem(userEmail: string | null, product: any): void {
  //   if (!userEmail) return;
  //   this.cartCollection(userEmail).doc(product.id).delete();
  // }

  updateQuantity(userEmail: string | null, product: any, quantity: number): void {
    if (!userEmail) return;
    this.cartCollection(userEmail).doc(product.id).update({ quantity });
  }

  getSubtotal(cartItems: CartItem[]): number {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
