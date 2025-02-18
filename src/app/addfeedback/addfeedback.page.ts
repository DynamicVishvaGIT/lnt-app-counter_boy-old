import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { ToastController,AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-addfeedback',
  templateUrl: './addfeedback.page.html',
  styleUrls: ['./addfeedback.page.scss'],
})
export class AddfeedbackPage implements OnInit {


  Counterboyid;
  feedbackForm = {
    subject:null,
		message: null,
  };
  constructor(
    public toastCtrl:ToastController,
    public apiService:ApiService,
    private storage:Storage,
    public alertController: AlertController,
    public router:Router

  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get('counterboy').then(data=>{
      console.log('ionViewWillEnter',data)
      this.Counterboyid=data['id']
  })
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Feedback added successfully',
      buttons: [{
        text: 'OK',
        handler: () => {
          setTimeout(() => this.router.navigate(['feedback']), 500);
        }
      }],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position:'bottom',
      mode:'ios',
      color:'dark'
    });
    toast.present();
  }
  feedbkForm(){
    if(this.feedbackForm.subject=='' || !this.feedbackForm.subject){
      this.showToast('Please Enter Subject')
    }
    if(this.feedbackForm.message==''|| !this.feedbackForm.message){
      this.showToast('Please Enter Message')
    }
    else{
      var form_data={'Counterboyid':this.Counterboyid,'subject':this.feedbackForm.subject,'message':this.feedbackForm.message}
      console.log('fr',form_data)
      this.apiService.addFeedback(form_data).then(data=>{
        console.log('data',data)
        this.presentAlert()
        this.feedbackForm = {
          subject:null,
          message: null,
        };

      }).catch(err=>{
        console.log('err',err)
      })
    }
    
  }
}
