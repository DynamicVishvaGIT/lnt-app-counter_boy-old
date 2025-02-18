import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-passbookpage',
  templateUrl: './passbookpage.page.html',
  styleUrls: ['./passbookpage.page.scss'],
})
export class PassbookpagePage implements OnInit {
  tran_please_wait:string = "Please Wait";
  passbook;
  date;
  constructor(
    public apiService:ApiService,
    public router:Router,
    public storage:Storage,
    public loadingCtrl: LoadingController,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
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
  
  ionViewWillEnter(){
    this.date=this.route.snapshot.paramMap.get('todaydate')
    console.log(this.date)
    this.presentLoading()
    this.storage.get('counterboy').then(data=>{
      console.log(data['id'])
      this.apiService.dailyElectricianPoints(data['id'],this.date).then(data=>{
        console.log(data)
        this.passbook=JSON.parse(data.data)
        this.loadingCtrl.dismiss()
      }).catch(error=>{
        console.log(error)
        
        this.loadingCtrl.dismiss()

      })
    })
  }
  doRefresh(event){
    this.storage.get('counterboy').then(data=>{
      console.log(data['id'])
      this.apiService.dailyElectricianPoints(data['id'],this.date).then(data=>{
        this.passbook=JSON.parse(data.data)
        event.target.complete()
      }).catch(error=>{
        console.log(error)
        event.target.complete()
      })
    })
  }
}
