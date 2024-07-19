import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkpharmacyPage } from './linkpharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: LinkpharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkpharmacyPageRoutingModule {}
