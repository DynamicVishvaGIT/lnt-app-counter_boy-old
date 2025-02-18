import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from './api.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {

  constructor(
  	private platform : Platform,
  	private oneSignal : OneSignal,
  	private apiService: ApiService
  	) {
		
	}

  	init(){
		
		

	  	this.oneSignal.startInit('5cc74816-97ec-440c-9256-16d612289813', '669309510571');
		  this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

		/*this.oneSignal.handleNotificationReceived().subscribe(() => {
		 // do something when notification is received
		});*/

		this.oneSignal.handleNotificationOpened().subscribe((notification) => {
			// do something when a notification is opened
			localStorage.setItem('goto_scheme_page', '1');
		});

		this.oneSignal.endInit();

	    this.oneSignal.getIds().then((id) => {
		});

	}

}
