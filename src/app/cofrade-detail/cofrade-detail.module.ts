import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CofradeDetailPageRoutingModule } from './cofrade-detail-routing.module';

import { CofradeDetailPage } from './cofrade-detail.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CofradeDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CofradeDetailPage]
})
export class CofradeDetailPageModule {}
