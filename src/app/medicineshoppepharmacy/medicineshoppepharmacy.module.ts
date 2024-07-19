import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicineshoppepharmacyPageRoutingModule } from './medicineshoppepharmacy-routing.module';

import { MedicineshoppepharmacyPage } from './medicineshoppepharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicineshoppepharmacyPageRoutingModule
  ],
  declarations: [MedicineshoppepharmacyPage]
})
export class MedicineshoppepharmacyPageModule {}
