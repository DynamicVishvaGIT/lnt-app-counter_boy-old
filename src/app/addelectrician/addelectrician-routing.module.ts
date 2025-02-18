import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddelectricianPage } from './addelectrician.page';

const routes: Routes = [
  {
    path: '',
    component: AddelectricianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddelectricianPageRoutingModule {}
