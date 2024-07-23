import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralenquiryPageRoutingModule } from './generalenquiry-routing.module';

import { GeneralenquiryPage } from './generalenquiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralenquiryPageRoutingModule
  ],
  declarations: [GeneralenquiryPage]
})
export class GeneralenquiryPageModule {}
