import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  constructor(private firestore: AngularFirestore) { }

  // Method to get pharmacies by brand from Firestore
  getPharmaciesByBrand(brand: string): Observable<any[]> {
    return this.firestore.collection('Users', ref => ref.where('pharmacyBrandType', '==', brand)).valueChanges();
  }

  // Method to get all products from Firestore
  getProducts(): Observable<any[]> {
    return this.firestore.collection('Products').valueChanges(); // Adjust 'Products' to your Firestore collection name
  }
}
