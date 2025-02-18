import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectriciandetailsPageRoutingModule } from './electriciandetails-routing.module';

import { ElectriciandetailsPage } from './electriciandetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectriciandetailsPageRoutingModule
  ],
  declarations: [ElectriciandetailsPage]
})
export class ElectriciandetailsPageModule {}
