import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScancodePageRoutingModule } from './scancode-routing.module';

import { ScancodePage } from './scancode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScancodePageRoutingModule
  ],
  declarations: [ScancodePage]
})
export class ScancodePageModule {}
