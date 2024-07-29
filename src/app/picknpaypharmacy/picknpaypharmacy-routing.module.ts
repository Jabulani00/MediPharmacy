import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PicknpaypharmacyPage } from './picknpaypharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: PicknpaypharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PicknpaypharmacyPageRoutingModule {}
