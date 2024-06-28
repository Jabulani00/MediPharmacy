import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSecondPageRoutingModule } from './home-second-routing.module';

import { HomeSecondPage } from './home-second.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSecondPageRoutingModule
  ],
  declarations: [HomeSecondPage]
})
export class HomeSecondPageModule {}
