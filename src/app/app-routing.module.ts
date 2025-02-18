import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'scancode',
    loadChildren: () => import('./scancode/scancode.module').then( m => m.ScancodePageModule)
  },
  {
    path: 'electricians',
    loadChildren: () => import('./electricians/electricians.module').then( m => m.ElectriciansPageModule)
  },
  {
    path: 'pointshistory',
    loadChildren: () => import('./pointshistory/pointshistory.module').then( m => m.PointshistoryPageModule)
  },
  {
    path: 'redeem',
    loadChildren: () => import('./redeem/redeem.module').then( m => m.RedeemPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'orderdetails',
    loadChildren: () => import('./orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule)
  },
  {
    path: 'passbook',
    loadChildren: () => import('./passbook/passbook.module').then( m => m.PassbookPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'verification/:mobile_no',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'addelectrician',
    loadChildren: () => import('./addelectrician/addelectrician.module').then( m => m.AddelectricianPageModule)
  },
  {
    path: 'orderconfirmation',
    loadChildren: () => import('./orderconfirmation/orderconfirmation.module').then( m => m.OrderconfirmationPageModule)
  },
  {
    path: 'electriciandetails/:elId',
    loadChildren: () => import('./electriciandetails/electriciandetails.module').then( m => m.ElectriciandetailsPageModule)
  },
  {
    path: 'passbookpage/:todaydate',
    loadChildren: () => import('./passbookpage/passbookpage.module').then( m => m.PassbookpagePageModule)
  },
  {
    path: 'qrmodal',
    loadChildren: () => import('./qrmodal/qrmodal.module').then( m => m.QrmodalPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'addfeedback',
    loadChildren: () => import('./addfeedback/addfeedback.module').then( m => m.AddfeedbackPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
