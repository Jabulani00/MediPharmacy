import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpringbokpharmacyPageRoutingModule } from './springbokpharmacy-routing.module';

import { SpringbokpharmacyPage } from './springbokpharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpringbokpharmacyPageRoutingModule
  ],
  declarations: [SpringbokpharmacyPage]
})
export class SpringbokpharmacyPageModule {}
