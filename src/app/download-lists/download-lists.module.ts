import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadListsPageRoutingModule } from './download-lists-routing.module';

import { DownloadListsPage } from './download-lists.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadListsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DownloadListsPage]
})
export class DownloadListsPageModule {}
