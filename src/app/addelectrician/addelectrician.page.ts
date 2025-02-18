import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApiService } from '../api.service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addelectrician',
  templateUrl: './addelectrician.page.html',
  styleUrls: ['./addelectrician.page.scss'],
})
export class AddelectricianPage implements OnInit {
  states: any = [];
  cities: any = [];
  isoid;
  electricianFormField = {
		first_name: null,
    last_name: null,
		state: null,
    city: null,
    state_id: null,
    city_id: null,
    pincode: null,
    username:null
    
  };
  tran_please_wait:string = "Please Wait";
  tran_required_mobile_no:string = "Please Enter Your Mobile No";
  tran_required_first_name:string = "Please Enter Your First Name";
  tran_required_last_name:string = "Please Enter Your Last Name";
  tran_required_state:string = "Please Select Your State";
  tran_required_city:string = "Please Select Your City";
  tran_required_pincode:string = "Please Enter Pincode";
  tran_went_wrong:string = 'Something went wrong, please try again later.';
  counterboyid: any;

  constructor(
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    public translate: TranslateService,
    private storage:Storage,
    public router:Router,
    public alertController: AlertController

  ) { 
    this.translate.get('please_wait').subscribe(res => { this.tran_please_wait = res; console.log(res)});
    this.translate.get('required_first_name').subscribe(res => { this.tran_required_first_name = res; });
    this.translate.get('required_last_name').subscribe(res => { this.tran_required_last_name = res; });
    this.translate.get('required_state').subscribe(res => { this.tran_required_state = res; });
    this.translate.get('required_city').subscribe(res => { this.tran_required_city = res; });
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      mode: "md",
      message: message,
      backdropDismiss:false,
      buttons: [
        {
          text: "OK",
          handler: () => {
            setTimeout(() => this.router.navigate(["electricians"]), 500);
          },
        },
      ],
    });

    await alert.present();
  }
  ionViewWillEnter(){
    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.counterboyid=data['id']
      this.apiService.parentId(this.counterboyid).then(data=>{
        console.log(data)
        this.isoid=JSON.parse(data.data)['id']
      })
    })
  }
  loadStates(){
    this.apiService.states().then(
      data => this.handleStates(data),
    ).catch(error => {
      console.log(error)
    })
  }

  handleStates(data){
    console.log('state',data)
    this.states = JSON.parse(data.data);
    
    var selectedItem = this.states.find(
      t => t.id == this.electricianFormField.state_id
    );
    var indexNo = this.states.indexOf(selectedItem);
    if (indexNo != -1) {
      this.electricianFormField.state = this.states[indexNo];
    }

    if(this.electricianFormField.state){
      this.loadCities(this.electricianFormField.state.id);
    }
  }

  changeState(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    this.cities = [];
    this.electricianFormField.city = null;
    this.electricianFormField.city_id = null;
    this.electricianFormField.state_id = event.value.id;
    this.loadCities(event.value.id);
  }

  

  loadCities(state_id){
  	this.apiService.cities(state_id).then(
      data => this.handleCities(data),
     
    ).catch(error => {
      console.log(error)
    })
  }

  handleCities(data){
    console.log('cities',data)
    // if(this.othercity==null){
      this.cities = JSON.parse(data.data)
      
  }
  ngOnInit() {
    this.loadStates()
  }
  ElectricianForm(){
   
    console.log('1')
    if(this.electricianFormField.first_name == '' || this.electricianFormField.first_name == null){
      
      this.apiService.presentToast(this.tran_required_first_name,3000);

    }
    
    else if(this.electricianFormField.last_name == '' || this.electricianFormField.last_name == null){

      this.apiService.presentToast(this.tran_required_last_name,3000);
    }
    else if(this.electricianFormField.username == '' || this.electricianFormField.username == null){

      this.apiService.presentToast(this.tran_required_mobile_no,3000);
    }
    else if(this.electricianFormField.state == '' || this.electricianFormField.state == null){
      this.apiService.presentToast(this.tran_required_state,3000);
    }else if(this.electricianFormField.city == '' || this.electricianFormField.city == null){
      this.apiService.presentToast(this.tran_required_city,3000);
    } 
    else if(this.electricianFormField.pincode == '' || this.electricianFormField.pincode == null){

      this.apiService.presentToast(this.tran_required_pincode,3000);
    }
    else{
    
      this.presentLoading()
      var electricianFormField = {
          'firstName': this.electricianFormField.first_name,
          'lastName': this.electricianFormField.last_name,
          'stateid': this.electricianFormField.state.id,
          'cityid': this.electricianFormField.city.id,
          'pincode':this.electricianFormField.pincode,
          'username':this.electricianFormField.username,
          'counterboyid':this.counterboyid,
          'isoid':this.isoid
       
        };
      console.log('edit',electricianFormField)
        this.apiService.addElectrician(electricianFormField).then(data=>{
          console.log(data)
          this.loadingCtrl.dismiss();
          this.electricianFormField = {
            first_name: null,
            last_name: null,
            state: null,
            city: null,
            state_id: null,
            city_id: null,
            pincode: null,
            username:null
            
          };
         this.presentAlert(data.data)
        }).catch(err=>{
          console.log(err)
          this.handleError(err)
        })
      
    }
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      message: this.tran_please_wait+'...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


	handleError(error) {
    this.loadingCtrl.dismiss()
    
		let errorMsg = '';
		if(error.status == 401){
		  errorMsg = error.error.message;
		}else{
      errorMsg = error.error.error;
    }
		
		if(errorMsg != ''){
		  this.apiService.presentToast(errorMsg,4000);
		}
	}
}
