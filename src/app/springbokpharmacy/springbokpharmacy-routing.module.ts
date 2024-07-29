import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpringbokpharmacyPage } from './springbokpharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: SpringbokpharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpringbokpharmacyPageRoutingModule {}
