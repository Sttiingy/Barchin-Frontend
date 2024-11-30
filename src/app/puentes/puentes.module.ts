import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuentesPageRoutingModule } from './puentes-routing.module';

import { PuentesPage } from './puentes.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuentesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PuentesPage]
})
export class PuentesPageModule {}
