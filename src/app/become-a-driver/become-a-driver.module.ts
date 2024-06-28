import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BecomeADriverPageRoutingModule } from './become-a-driver-routing.module';

import { BecomeADriverPage } from './become-a-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BecomeADriverPageRoutingModule
  ],
  declarations: [BecomeADriverPage]
})
export class BecomeADriverPageModule {}
