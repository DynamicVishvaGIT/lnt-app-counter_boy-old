import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointshistoryPage } from './pointshistory.page';

const routes: Routes = [
  {
    path: '',
    component: PointshistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointshistoryPageRoutingModule {}
