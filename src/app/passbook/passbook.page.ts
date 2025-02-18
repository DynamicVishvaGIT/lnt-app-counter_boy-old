import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-passbook',
  templateUrl: './passbook.page.html',
  styleUrls: ['./passbook.page.scss'],
})
export class PassbookPage implements OnInit {
  tran_please_wait:string = "Please Wait";
  passbook_obj: any;
  passbook_earn: any;
  filterPassbook: any;
  dataPresent;
  selectedSegment:string = 'earned'
  constructor(
    public storage:Storage,
    public apiService:ApiService,
    public loadingCtrl: LoadingController,
    public router:Router,

    
  ) { }
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
  
  ionViewDidEnter(){
    this.presentLoading()
    this.storage.get('counterboy').then(data=>{
      console.log(data['id'])
      this.apiService.electricianPointsDate(data['id']).then(data=>{
        this.passbook_obj=JSON.parse(data.data)
        console.log('a',this.passbook_obj)
        this.filterPassbook=this.passbook_obj;
        if(this.passbook_obj[0]){
          this.dataPresent=true
        }
        else{
          this.dataPresent=false
        }
        this.loadingCtrl.dismiss()
      }).catch(error=>{
        console.log(error)
        
        this.loadingCtrl.dismiss()

      })
    })
    this.storage.get('counterboy').then(data=>{
      console.log(data['id'])
      this.apiService.pointByElectrician(data['id']).then(data=>{
        this.passbook_earn=JSON.parse(data.data)
        console.log('a',this.passbook_earn)
        this.filterPassbook=this.passbook_earn;
        if(this.passbook_earn[0]){
          this.dataPresent=true
        }
        else{
          this.dataPresent=false
        }
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
      this.apiService.electricianPointsDate(data['id']).then(data=>{

        this.passbook_obj=JSON.parse(data.data)
        this.filterPassbook=this.passbook_obj;
        if(this.passbook_obj[0]){
          this.dataPresent=true
        }
        else{
          this.dataPresent=false
        }
        event.target.complete()
      }).catch(error=>{
        console.log(error)
        event.target.complete()

      })
    })
    this.storage.get('counterboy').then(data=>{
      console.log(data['id'])
      this.apiService.pointByElectrician(data['id']).then(data=>{

        this.passbook_earn=JSON.parse(data.data)
        this.filterPassbook=this.passbook_earn;
        if(this.passbook_earn[0]){
          this.dataPresent=true
        }
        else{
          this.dataPresent=false
        }
        event.target.complete()
      }).catch(error=>{
        console.log(error)
        event.target.complete()

      })
    })
  }
  segmentChanged(event: any) {
    console.log(event.target.value);
    this.selectedSegment = event.target.value
  }
  // openDetails(date){
  //   this.router.navigate(['passbookpage',date])
  // }
}
