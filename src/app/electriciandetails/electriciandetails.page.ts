import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-electriciandetails',
  templateUrl: './electriciandetails.page.html',
  styleUrls: ['./electriciandetails.page.scss'],
})
export class ElectriciandetailsPage implements OnInit {
  ID: any;
  electrician: any;
  tran_please_wait:string = "Please Wait";
  elId;
  constructor(
    private storage:Storage,
    public apiService:ApiService,
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

  ionViewDidEnter(){
    this.presentLoading()
    this.elId=this.route.snapshot.paramMap.get('elId')
    if(this.elId){
      this.storage.get('counterboy').then(data=>{
        console.log(data)
        this.ID=data['id']
        this.apiService.electricianDetail(this.ID,this.elId).then(data=>{
          console.log('ele',data)
          this.electrician=JSON.parse(data.data)
          this.loadingCtrl.dismiss()
        }).catch(err=>{
          this.loadingCtrl.dismiss()
  
          console.log(err)
        })
      })
    }
  
  }
  doRefresh(event) {
    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.ID=data['id']
      this.apiService.electricianDetail(this.ID,this.elId).then(data=>{
        console.log('ele',data)
        this.electrician=JSON.parse(data.data)
        event.target.complete()
      }).catch(err=>{
        event.target.complete()
        console.log(err)
      })
    })
  }
}
