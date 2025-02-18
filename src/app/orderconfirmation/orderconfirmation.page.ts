import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
export interface CountdownTimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}
@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.page.html',
  styleUrls: ['./orderconfirmation.page.scss'],
})
export class OrderconfirmationPage implements OnInit {
  @Input() gift;
  tran_please_wait:string = 'Please Wait';
  tran_required_otp:string = 'Enter OTP';
  tran_went_wrong:string = 'Something went wrong, please try again later.';
  tran_otp_send:string = 'OTP Sent Successfully';
  tran_order_success:string = "Gift Order Created Successfully";
  username;
  inputCode;
  msg;
  otp_send: boolean;
  counterboyid;
  constructor(
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    public translate: TranslateService,
    public route:ActivatedRoute,
    public router:Router,
    public modalCtrl:ModalController,
    public storage:Storage
  ) { 
    this.translate.get('please_wait').subscribe(res => { this.tran_please_wait = res; });
    this.translate.get('enter_otp').subscribe(res => { this.tran_required_otp = res; });
    this.translate.get('went_wrong').subscribe(res => { this.tran_went_wrong = res; });
    this.translate.get('otp_send').subscribe(res => { this.tran_otp_send = res; });
    this.translate.get('order_success').subscribe(res => { this.tran_order_success = res; });
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
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.username=data['mobile_no']
      this.counterboyid=data['id']

    })
  }
  submitOTPForm(){
  
    
    this.msg = null;

    if (this.inputCode == '' || this.inputCode == null) {
      this.apiService.presentToast(this.tran_required_otp,3000)
    }else{
      this.verifyOTP(this.inputCode);
    }
  }

  verifyOTP(code){
	
      const loading=this.presentLoading()
      var gift_data={"giftid":this.gift['id'],"qty":this.gift['qty'],"counterboyid":this.counterboyid}
      this.apiService.verifyGift(this.username,code,gift_data).then(
        data => { 
          console.log(data)
          this.handleReedemGiftResponse(data) 
        },
       
      ).catch(
        error => {
          console.log(error)
          this.handleError(error,true)
        }
      )
       
        
   
  }

 
  verifyOTPHandleResponse(data) {
    this.loadingCtrl.dismiss();
    this.apiService.presentToast(data.data,3000)
    console.log(data)
   
    }
  
    handleReedemGiftResponse(data) {
      this.loadingCtrl.dismiss();
      let toast = this.toastCtrl.create({
        message: '',
        duration: 1000,
        position: 'middle'
      });
      this.close_popup();
      this.apiService.presentToast(this.tran_order_success,3000).then(()=>{
        this.router.navigate(['orders'])
      })
    }
  
    handleResponse(data) {
    this.loadingCtrl.dismiss();
     
        this.apiService.presentToast(data.data,3000)
      
    }
  
    handleError(error,redirect = false) {
      console.log(error)
      this.loadingCtrl.dismiss();
      let errorMsg = '';
      if(error.status == 401){
        errorMsg = error.error.message;
      }else{
        errorMsg = error.error.error;
      }
      
      let toast = this.toastCtrl.create({
        message: '',
        duration: 3000,
        position: 'middle'
      });
  
      if(errorMsg != ''){
        this.apiService.presentToast(errorMsg,3000)
      
      }
      if(redirect == true){
        this.close_popup();
      }
    }
  
    close_popup() {
       this.modalCtrl.dismiss();
    }
}
