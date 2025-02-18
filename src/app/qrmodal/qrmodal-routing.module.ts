import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrmodalPage } from './qrmodal.page';

const routes: Routes = [
  {
    path: '',
    component: QrmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrmodalPageRoutingModule {}
