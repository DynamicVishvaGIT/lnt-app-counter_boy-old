import { Component,ViewChild } from '@angular/core';
import { IonTabs, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('myTabs',{ static: false }) tabs: IonTabs;
  public selectedIndex = 0;

  activeTabName;
  tab_name;
  constructor(
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router:Router,
    private platform: Platform,
    private storage:Storage,
    public appMinimize:AppMinimize,
    public location:Location


  ) {
    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(9999, () => {
      if ((this.router.url.includes('home')) || (this.router.url.includes('login')) ) {
        this.appMinimize.minimize();
      }
      else if  (this.router.url.includes('verification')) {
        this.router.navigate(['login'])
      }
       
      else if  ((this.router.url.includes('electricians')) ||(this.router.url.includes('orders')) ||(this.router.url.includes('passbook')) ||(this.router.url.includes('profile')) ||(this.router.url.includes('redeem')) ) {
        this.router.navigate(['home'])
      }
      else {
        this.location.back()
      }
     
       
    });

  }
  getSelectedTab(): void {
    this.activeTabName = this.tabs.getSelected();
    this.tab_name=this.activeTabName
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#f4b404')
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.isLoggedIn()
      // this.presentAdvertisementModal()
    });
  }
  isLoggedIn(){
    this.storage.create()
    this.storage.get('counterboy').then(data=>{
      if(data){
        this.router.navigate(['home'])
      }
      else{
        this.router.navigate(['login'])
      }
    })
  }


}
