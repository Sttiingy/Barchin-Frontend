import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCofradePage } from './edit-cofrade.page';

const routes: Routes = [
  {
    path: '',
    component: EditCofradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCofradePageRoutingModule {}
