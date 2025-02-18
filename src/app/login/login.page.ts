import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { PushnotificationService } from '../pushnotification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormField = {
    Username: '',
    password: ''
  }
  tran_please_wait:string = 'Please Wait';
  tran_required_mobile_no:string = 'Please Enter Your Mobile No';
  tran_required_password:string = 'Please Enter Your Password';  
  constructor(
    public router:Router,
    private toastController: ToastController,
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    public pushNotification: PushnotificationService,
    public menuCtrl: MenuController,

  ) {
    this.menuCtrl.enable(false);

   }

  ngOnInit() {
  }
  loginForm(){
  
    if (this.loginFormField.Username == '' || this.loginFormField.Username == null) {
      this.apiService.presentToast(this.tran_required_mobile_no,3000)
    }
    else{
      const loading=this.presentLoading()
        this.apiService.login(this.loginFormField).then(
          data => {
            this.handleResponse(data)

          },
        ).catch(err=>{
          this.handleError(err)
        })
    }
  }

  handleResponse(data) {
    console.log('3',data)
    this.loadingCtrl.dismiss()
    this.router.navigate(['verification',this.loginFormField.Username]).then(data=>{
      this.loginFormField = {
        Username: '',
        password: ''
      }
    })
  }

  handleError(error) {
    console.log('4',error)
    this.loadingCtrl.dismiss()

    let errorMsg = '';
    if(error.status == 401){
      errorMsg = error.error['error'];
    }
    // else if(error.status = 412){
    //   errorMsg = error.error.error;
    // }
    
    else{
      // errorMsg = error.error.error;
      errorMsg = error.error['error'];

    }
    this.apiService.presentToast(errorMsg,3000)

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

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
}

ionViewDidLeave() {
    this.menuCtrl.enable(true);
}
}