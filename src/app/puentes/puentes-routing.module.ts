import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuentesPage } from './puentes.page';

const routes: Routes = [
  {
    path: '',
    component: PuentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuentesPageRoutingModule {}
