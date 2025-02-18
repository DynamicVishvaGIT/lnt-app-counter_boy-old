import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddfeedbackPageRoutingModule } from './addfeedback-routing.module';

import { AddfeedbackPage } from './addfeedback.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddfeedbackPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddfeedbackPage]
})
export class AddfeedbackPageModule {}
