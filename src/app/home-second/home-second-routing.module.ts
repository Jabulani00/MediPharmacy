import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSecondPage } from './home-second.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSecondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSecondPageRoutingModule {}
