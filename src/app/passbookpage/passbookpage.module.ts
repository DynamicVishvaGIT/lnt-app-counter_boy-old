import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassbookpagePageRoutingModule } from './passbookpage-routing.module';

import { PassbookpagePage } from './passbookpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassbookpagePageRoutingModule
  ],
  declarations: [PassbookpagePage]
})
export class PassbookpagePageModule {}
