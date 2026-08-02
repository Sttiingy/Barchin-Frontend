import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadListsPage } from './download-lists.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadListsPageRoutingModule {}
