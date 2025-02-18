import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  showMoreData=false;
  feedback;
  Counterboyid;
  tran_please_wait:string = "Please Wait";
  dataPresent;

  constructor(
    public router:Router,
    public apiService:ApiService,
    private storage:Storage,
    public loadingCtrl: LoadingController,


  ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.presentLoading()
    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.Counterboyid=data['id']
      this.apiService.fetchFeedback(this.Counterboyid).then(data=>{
        this.feedback=JSON.parse(data.data)
        if(this.feedback[0]){
          this.dataPresent=true
        }
        else{
          this.dataPresent=false
        }
        this.loadingCtrl.dismiss()
      }).catch(err=>{
        this.loadingCtrl.dismiss()
      })
  })
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

  openFeedbackForm(){
    this.router.navigateByUrl('/addfeedback')
  }

  doRefresh(event) {
    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.Counterboyid=data['id']

      this.apiService.fetchFeedback(this.Counterboyid).then(data=>{
        this.feedback=JSON.parse(data.data)
        if(this.feedback[0]){
          this.dataPresent=true
        }
        else{
          this.dataPresent=false
        }
        this.loadingCtrl.dismiss()
        event.target.complete()
      }).catch(err=>{
        this.loadingCtrl.dismiss()
        event.target.complete()
      })
     
    })
  }
  viewMore(fbk){
    fbk['isShow']=!fbk['isShow']
  }
}
