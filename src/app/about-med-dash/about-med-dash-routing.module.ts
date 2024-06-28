import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutMedDashPage } from './about-med-dash.page';

const routes: Routes = [
  {
    path: '',
    component: AboutMedDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutMedDashPageRoutingModule {}
