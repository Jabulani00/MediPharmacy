import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerPageRoutingModule } from './customer-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomerPage } from './customer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPageRoutingModule
  ],
  declarations: [CustomerPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerPageModule {}
