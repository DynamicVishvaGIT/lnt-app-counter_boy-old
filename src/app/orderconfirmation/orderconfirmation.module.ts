import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderconfirmationPageRoutingModule } from './orderconfirmation-routing.module';

import { OrderconfirmationPage } from './orderconfirmation.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [

  CommonModule,
    FormsModule,
    IonicModule,
    OrderconfirmationPageRoutingModule,
    TranslateModule
  ],
  declarations: [OrderconfirmationPage]
})
export class OrderconfirmationPageModule {}
