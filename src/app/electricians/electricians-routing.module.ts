import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectriciansPage } from './electricians.page';

const routes: Routes = [
  {
    path: '',
    component: ElectriciansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectriciansPageRoutingModule {}
