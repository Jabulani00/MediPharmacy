import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PharmacistdirectPageRoutingModule } from './pharmacistdirect-routing.module';

import { PharmacistdirectPage } from './pharmacistdirect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PharmacistdirectPageRoutingModule
  ],
  declarations: [PharmacistdirectPage]
})
export class PharmacistdirectPageModule {}
