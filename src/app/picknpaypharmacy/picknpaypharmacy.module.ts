import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PicknpaypharmacyPageRoutingModule } from './picknpaypharmacy-routing.module';

import { PicknpaypharmacyPage } from './picknpaypharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PicknpaypharmacyPageRoutingModule
  ],
  declarations: [PicknpaypharmacyPage]
})
export class PicknpaypharmacyPageModule {}
