import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointshistoryPageRoutingModule } from './pointshistory-routing.module';

import { PointshistoryPage } from './pointshistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointshistoryPageRoutingModule
  ],
  declarations: [PointshistoryPage]
})
export class PointshistoryPageModule {}
