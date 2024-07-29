import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlphapharmacyPage } from './alphapharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: AlphapharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlphapharmacyPageRoutingModule {}
