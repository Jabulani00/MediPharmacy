import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlphapharmacyPageRoutingModule } from './alphapharmacy-routing.module';

import { AlphapharmacyPage } from './alphapharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlphapharmacyPageRoutingModule
  ],
  declarations: [AlphapharmacyPage]
})
export class AlphapharmacyPageModule {}
