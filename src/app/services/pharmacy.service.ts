import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Pharmacy } from 'src/app/dischempharmacy/models/pharmacy.model';


@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(
    private db: AngularFirestore,
   // private pharmacy: Pharmacy 
  ) { }

  // Method to register a new pharmacy
  registerPharmacy(pharmacy: Pharmacy) {
    return this.db.collection
    (
      'users'
    )
    .add(pharmacy);
  }

  // src/app/pharmacy.service.ts
getPharmacies() {
  return this.db.collection
  (
    'users', ref => ref.where
    (
      'role', '==', 'Pharmacy'
    )
  )
  .valueChanges();
}

}
