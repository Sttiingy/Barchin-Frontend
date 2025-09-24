import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CofradeDetailPage } from './cofrade-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CofradeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CofradeDetailPageRoutingModule {}
