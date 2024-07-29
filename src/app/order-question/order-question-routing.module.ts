import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderQUESTIONPage } from './order-question.page';

const routes: Routes = [
  {
    path: '',
    component: OrderQUESTIONPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderQUESTIONPageRoutingModule {}
