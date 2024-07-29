import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralenquiryPage } from './generalenquiry.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralenquiryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralenquiryPageRoutingModule {}
