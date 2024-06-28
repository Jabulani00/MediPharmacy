import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsAndconditionsPage } from './terms-andconditions.page';

const routes: Routes = [
  {
    path: '',
    component: TermsAndconditionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsAndconditionsPageRoutingModule {}
