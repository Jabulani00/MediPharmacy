import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClickspharmacyPageRoutingModule } from './clickspharmacy-routing.module';

import { ClickspharmacyPage } from './clickspharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClickspharmacyPageRoutingModule
  ],
  declarations: [ClickspharmacyPage]
})
export class ClickspharmacyPageModule {}
