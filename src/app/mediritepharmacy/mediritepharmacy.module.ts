import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediritepharmacyPageRoutingModule } from './mediritepharmacy-routing.module';

import { MediritepharmacyPage } from './mediritepharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediritepharmacyPageRoutingModule
  ],
  declarations: [MediritepharmacyPage]
})
export class MediritepharmacyPageModule {}
