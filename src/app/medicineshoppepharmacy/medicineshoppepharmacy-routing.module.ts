import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicineshoppepharmacyPage } from './medicineshoppepharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: MedicineshoppepharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicineshoppepharmacyPageRoutingModule {}
