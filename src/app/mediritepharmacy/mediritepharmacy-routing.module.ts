import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediritepharmacyPage } from './mediritepharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: MediritepharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediritepharmacyPageRoutingModule {}
