import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutMedDashPageRoutingModule } from './about-med-dash-routing.module';

import { AboutMedDashPage } from './about-med-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutMedDashPageRoutingModule
  ],
  declarations: [AboutMedDashPage]
})
export class AboutMedDashPageModule {}
