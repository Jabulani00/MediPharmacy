import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectpharmacyPage } from './selectpharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: SelectpharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectpharmacyPageRoutingModule {}
