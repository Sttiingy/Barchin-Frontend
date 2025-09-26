import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCofradePageRoutingModule } from './edit-cofrade-routing.module';

import { EditCofradePage } from './edit-cofrade.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCofradePageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditCofradePage]
})
export class EditCofradePageModule {}
