import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrescriptionModalPage } from './prescription-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PrescriptionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescriptionModalPageRoutingModule {}
