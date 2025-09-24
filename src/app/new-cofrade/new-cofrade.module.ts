import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCofradePageRoutingModule } from './new-cofrade-routing.module';

import { NewCofradePage } from './new-cofrade.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCofradePageRoutingModule,
    ComponentsModule
  ],
  declarations: [NewCofradePage]
})
export class NewCofradePageModule {}
