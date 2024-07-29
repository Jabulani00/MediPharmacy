import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsQUESTIONPageRoutingModule } from './payments-question-routing.module';

import { PaymentsQUESTIONPage } from './payments-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsQUESTIONPageRoutingModule
  ],
  declarations: [PaymentsQUESTIONPage]
})
export class PaymentsQUESTIONPageModule {}
