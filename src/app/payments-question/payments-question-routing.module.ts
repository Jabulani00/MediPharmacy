import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsQUESTIONPage } from './payments-question.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsQUESTIONPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsQUESTIONPageRoutingModule {}
