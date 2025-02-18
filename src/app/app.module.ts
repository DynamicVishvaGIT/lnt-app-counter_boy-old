import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
// import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient } from '@angular/common/http';

import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from './token.service';
import { Storage } from '@ionic/storage';
import { IonicSelectableModule } from 'ionic-selectable';
import { OrderconfirmationPageModule } from './orderconfirmation/orderconfirmation.module';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QrmodalPageModule } from './qrmodal/qrmodal.module';
import { Sim } from '@ionic-native/sim/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [

  BrowserModule,
    HttpClientModule,

    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicSelectableModule,
    OrderconfirmationPageModule,
    NgxQRCodeModule,
    QrmodalPageModule
  ],
  providers: [ 
    HTTP,
    OneSignal,
    StatusBar,
    SplashScreen,
    Storage,
    AppMinimize,
    Camera,
    File,
    FileTransfer,
    Base64,
    Sim,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
  default_lang:any;
  constructor(
    public translate: TranslateService, public token: TokenService
  ) {
    this.default_lang = token.getLang() ?  token.getLang() : 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(this.default_lang);
  }
}
