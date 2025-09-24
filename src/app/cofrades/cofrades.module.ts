import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CofradesPageRoutingModule } from './cofrades-routing.module';

import { ComponentsModule } from '../components/components.module';
import { CofradesPage } from './cofrades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CofradesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CofradesPage]
})
export class CofradesPageModule {}
