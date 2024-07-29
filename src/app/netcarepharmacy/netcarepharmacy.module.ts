import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NetcarepharmacyPageRoutingModule } from './netcarepharmacy-routing.module';

import { NetcarepharmacyPage } from './netcarepharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NetcarepharmacyPageRoutingModule
  ],
  declarations: [NetcarepharmacyPage]
})
export class NetcarepharmacyPageModule {}
