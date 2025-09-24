import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCofradePage } from './new-cofrade.page';

const routes: Routes = [
  {
    path: '',
    component: NewCofradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCofradePageRoutingModule {}
