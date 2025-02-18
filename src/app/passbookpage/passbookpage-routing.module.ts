import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassbookpagePage } from './passbookpage.page';

const routes: Routes = [
  {
    path: '',
    component: PassbookpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassbookpagePageRoutingModule {}
