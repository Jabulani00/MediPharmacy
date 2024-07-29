import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectpharmacyPageRoutingModule } from './selectpharmacy-routing.module';

import { SelectpharmacyPage } from './selectpharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectpharmacyPageRoutingModule
  ],
  declarations: [SelectpharmacyPage]
})
export class SelectpharmacyPageModule {}
