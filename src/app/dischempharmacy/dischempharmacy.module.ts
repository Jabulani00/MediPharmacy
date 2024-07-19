import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DischempharmacyPageRoutingModule } from './dischempharmacy-routing.module';

import { DischempharmacyPage } from './dischempharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DischempharmacyPageRoutingModule
  ],
  declarations: [DischempharmacyPage]
})
export class DischempharmacyPageModule {}
