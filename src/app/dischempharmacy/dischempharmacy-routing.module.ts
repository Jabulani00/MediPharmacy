import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {  DischemPharmacyPage } from './dischempharmacy.page';


const routes: Routes = [
  {
    path: '',
    component:  DischemPharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DischempharmacyPageRoutingModule {}
