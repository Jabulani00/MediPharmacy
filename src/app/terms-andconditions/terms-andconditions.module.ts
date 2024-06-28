import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsAndconditionsPageRoutingModule } from './terms-andconditions-routing.module';

import { TermsAndconditionsPage } from './terms-andconditions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsAndconditionsPageRoutingModule
  ],
  declarations: [TermsAndconditionsPage]
})
export class TermsAndconditionsPageModule {}
