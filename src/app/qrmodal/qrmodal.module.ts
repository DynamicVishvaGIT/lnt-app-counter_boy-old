import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrmodalPageRoutingModule } from './qrmodal-routing.module';

import { QrmodalPage } from './qrmodal.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrmodalPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [QrmodalPage]
})
export class QrmodalPageModule {}
