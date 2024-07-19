import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClickspharmacyPage } from './clickspharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: ClickspharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClickspharmacyPageRoutingModule {}
