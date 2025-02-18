import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-electricians',
  templateUrl: './electricians.page.html',
  styleUrls: ['./electricians.page.scss'],
})
export class ElectriciansPage implements OnInit {
  ID: any;
  isoid;
  electricians: any;
  tran_please_wait:string = "Please Wait";
  filterElectricians;
  dataPresent;
  constructor(
    private storage:Storage,
    public apiService:ApiService,
    public loadingCtrl: LoadingController,
    public router:Router
    

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

    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.ID=data['id']
      this.apiService.electricianList(this.ID).then(data=>{
        console.log('ele',data)
        this.electricians=JSON.parse(data.data)
        this.filterElectricians=this.electricians
        if(this.electricians[0]){
          this.dataPresent=true
        }
        else{
          this.dataPresent=false
        }
        this.loadingCtrl.dismiss()
      }).catch(err=>{
        this.loadingCtrl.dismiss()

        console.log(err)
      })
      this.apiService.parentId(this.ID).then(data=>{
        console.log(data)
        this.isoid=JSON.parse(data.data)['id']
      })
    })
  }
  onSearchTerm(ev) {

    this.electricians = this.filterElectricians;
    const val = ev.detail.value;
   
    if (val && val.trim() !== '') {
      this.electricians = this.electricians.filter(term => {
        if (term.electricianFullName) {
            var name=(term.electricianFullName).toLowerCase()

            return name.indexOf(val.trim().toLowerCase()) > -1 || term.username.
            indexOf(val.trim().toLowerCase()) > -1
        }
        
      });
    }
  }
  doRefresh(event) {
    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.ID=data['id']
      this.apiService.electricianList(this.ID).then(data=>{
        console.log('ele',data)
        this.electricians=JSON.parse(data.data)
        this.filterElectricians=this.electricians
        if(this.electricians[0]){
          this.dataPresent=true
        }
        else{
          this.dataPresent=false
        }
            event.target.complete()
      }).catch(err=>{
          event.target.complete()
        console.log(err)
      })
      this.apiService.parentId(this.ID).then(data=>{
        console.log(data)
        this.isoid=JSON.parse(data.data)['id']
      })
    })
  }
  openElectricianForm(){
    if(this.isoid){
      this.router.navigate(['addelectrician'])
    }
    else{
      this.apiService.presentToast("Counter Boy is not mapped to ISO",3000)
    }
  }
}
