import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PrescriptionModalPage } from './prescription-modal.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [PrescriptionModalPage],
  exports: [PrescriptionModalPage]
})
export class PrescriptionModalPageModule {}
