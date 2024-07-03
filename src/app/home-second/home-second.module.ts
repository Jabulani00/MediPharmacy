import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeSecondPageRoutingModule } from './home-second-routing.module';

import { HomeSecondPage } from './home-second.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSecondPageRoutingModule
  ],
  declarations: [HomeSecondPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeSecondPageModule {}
