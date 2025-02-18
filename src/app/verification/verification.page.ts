import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
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
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  inputCode = null;

  tran_please_wait:string = 'Please Wait';
  tran_required_otp:string = 'Enter OTP';
  tran_went_wrong:string = 'Something went wrong, please try again later.';
  tran_otp_send:string = 'OTP Sent Successfully';
  mobile_no;
  msg = null; 
  otp_send: boolean = false;
  timeInSeconds: number = 10;
  timer: CountdownTimer;

  constructor(
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    public menuCtrl: MenuController,
    private route: ActivatedRoute,
    private router:Router,
    private storage: Storage,
  ) { 
    this.menuCtrl.enable(false);
    this.storage.create()
  }
  ionViewWillEnter(){
    this.mobile_no=this.route.snapshot.paramMap.get('mobile_no');
  }
  ngOnInit() {
  }
  doLogout(){
    this.storage.remove('counterboy').then(_=>{
      this.router.navigate(['login'])
    })
  }

 submitOTPForm(){
  

  if (this.inputCode == '' || this.inputCode == null) {
    this.apiService.presentToast(this.tran_required_otp,1000)
   
  }else{
    this.verifyOTP(this.inputCode);
  }
}
verifyOTP(code){
  // const loading=this.presentLoading()
    this.apiService.verify_otp(this.mobile_no,code).then(
      data => this.verifyOTPHandleResponse(data),
    ).catch(error=>{
      this.handleError(error)
    })
  
    
 }

 sendOTP(){
 const loading=this.presentLoading()
    this.apiService.send_otp().then(
      data => this.handleResponse(data),
    ).catch(error=>{
      this.handleError(error)
    })
     
 }
 verifyOTPHandleResponse(data) {
  console.log('3',JSON.parse(data.data))

  this.loadingCtrl.dismiss();
  this.storage.set('counterboy',JSON.parse(data.data))
  console.log('3',JSON.parse(data.data)['id'])
  this.router.navigate(['home'])

 }

 handleResponse(data) {
   console.log('1')
 this.loadingCtrl.dismiss();
   if (data.success == true) {
     
     let obj = data.otp_response;
     if(obj.statusCode == 900 || obj.statusCode == 952 || obj.statusCode == 957){
         this.msg = this.tran_otp_send;
       this.otp_send = true;
     }else{
         this.msg = this.tran_went_wrong;
       this.otp_send = false;
     }
     this.apiService.presentToast(this.msg,3000)
     
     
   }
// this.initTimer();
   this.startTimer()
 }

 handleError(error) {
   console.log(error)
   console.log('2')

   this.loadingCtrl.dismiss();
   let errorMsg = '';
   if(error.status == 401){
     errorMsg = error.error.message;
   }else{
     errorMsg = error.error.error;
   }


   if(errorMsg != ''){
     this.apiService.presentToast(errorMsg,3000)
  

     
   }
 }

 startTimer() {
   this.timer.hasStarted = true;
   this.timer.runTimer = true;
   this.timerTick();
 }

 pauseTimer() {
   this.timer.runTimer = false;
 }

 resumeTimer() {
   this.startTimer();
 }

 timerTick() {
   setTimeout(() => {
     if (!this.timer.runTimer) { return; }
     this.timer.secondsRemaining--;
     this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
     if (this.timer.secondsRemaining > 0) {
       this.timerTick();
     } else {
       this.timer.hasFinished = true;
       this.otp_send = false;
     }
   }, 1000);
 }

 getSecondsAsDigitalClock(inputSeconds: number) {
   const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
   const hours = Math.floor(secNum / 3600);
   const minutes = Math.floor((secNum - (hours * 3600)) / 60);
   const seconds = secNum - (hours * 3600) - (minutes * 60);
   let hoursString = '';
   let minutesString = '';
   let secondsString = '';
   hoursString = (hours < 10) ? '0' + hours : hours.toString();
   minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
   secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
   return hoursString + ':' + minutesString + ':' + secondsString;
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
ionViewDidLeave(){
  this.otp_send=false;
}
}
