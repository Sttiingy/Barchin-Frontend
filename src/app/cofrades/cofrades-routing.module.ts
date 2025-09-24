import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CofradesPage } from './cofrades.page';

const routes: Routes = [
  {
    path: '',
    component: CofradesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CofradesPageRoutingModule {}
