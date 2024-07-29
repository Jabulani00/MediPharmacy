import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkpharmacyPageRoutingModule } from './linkpharmacy-routing.module';

import { LinkpharmacyPage } from './linkpharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkpharmacyPageRoutingModule
  ],
  declarations: [LinkpharmacyPage]
})
export class LinkpharmacyPageModule {}
