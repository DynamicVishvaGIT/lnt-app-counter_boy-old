import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddelectricianPageRoutingModule } from './addelectrician-routing.module';

import { AddelectricianPage } from './addelectrician.page';

import { IonicSelectableModule } from 'ionic-selectable';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddelectricianPageRoutingModule,
    IonicSelectableModule,
    TranslateModule
  ],
  declarations: [AddelectricianPage]
})
export class AddelectricianPageModule {}
