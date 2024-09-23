import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  description: string;
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

  private orderHistoryCollection(userEmail: string | null) {
    if (!userEmail) throw new Error('User email is null');
    return this.firestore.collection('order-history').doc(userEmail).collection('orders');
  }

  addItem(userEmail: string | null, product: any, quantity: number): void {
    if (!userEmail) return;
    const cartItem = { product, quantity };
    this.cartCollection(userEmail).doc(product.id).set(cartItem);
  }

  removeItem(userEmail: string, productId: string): Promise<void> {
    return this.cartCollection(userEmail).doc(productId).delete();
  }

  getCartItems(userEmail: string | null): Observable<CartItem[]> {
    if (!userEmail) return new Observable<CartItem[]>(observer => observer.next([]));
    return this.cartCollection(userEmail).valueChanges() as Observable<CartItem[]>;
  }

  updateQuantity(userEmail: string | null, product: any, quantity: number): void {
    if (!userEmail) return;
    this.cartCollection(userEmail).doc(product.id).update({ quantity });
  }

  getSubtotal(cartItems: CartItem[]): number {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  // Move items to order history
  // Move items to order history
moveToOrderHistory(userEmail: string | null, items: CartItem[]): Promise<void> {
  if (!userEmail) return Promise.reject('User email is null');
  const orderData = {
    items,
    timestamp: new Date(),
  };

  // Use the add method and return a promise that resolves to void
  return this.orderHistoryCollection(userEmail).add(orderData).then(() => {
    return; // Resolve to void
  });
}


  // Clear cart items
  clearCart(userEmail: string | null): Promise<void> {
    if (!userEmail) return Promise.reject('User email is null');
    
    return this.cartCollection(userEmail).get().toPromise().then(snapshot => {
      if (snapshot && !snapshot.empty) { // Check if snapshot exists and is not empty
        const batch = this.firestore.firestore.batch();
        snapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      }
      return; // If snapshot is empty or undefined, resolve to void
    });
  }

  getOrderHistory(userEmail: string | null): Observable<any[]> {
    if (!userEmail) return new Observable<any[]>(observer => observer.next([]));
    return this.firestore.collection('order-history').doc(userEmail).collection('orders').valueChanges() as Observable<any[]>;
  }
  
  
}
