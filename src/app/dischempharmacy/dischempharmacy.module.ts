import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DischempharmacyPageRoutingModule } from './dischempharmacy-routing.module';

import { DischemPharmacyPage } from './dischempharmacy.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DischempharmacyPageRoutingModule,
  ],
  declarations: [DischemPharmacyPage],
})
export class DischemPharmacyPageModule {}
