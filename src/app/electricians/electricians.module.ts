import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectriciansPageRoutingModule } from './electricians-routing.module';

import { ElectriciansPage } from './electricians.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectriciansPageRoutingModule,
  ],
  declarations: [ElectriciansPage]
})
export class ElectriciansPageModule {}
