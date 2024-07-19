import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DischempharmacyPage } from './dischempharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: DischempharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DischempharmacyPageRoutingModule {}
