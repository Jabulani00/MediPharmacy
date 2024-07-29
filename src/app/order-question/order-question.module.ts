import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderQUESTIONPageRoutingModule } from './order-question-routing.module';

import { OrderQUESTIONPage } from './order-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderQUESTIONPageRoutingModule
  ],
  declarations: [OrderQUESTIONPage]
})
export class OrderQUESTIONPageModule {}
