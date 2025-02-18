import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders;
  dataPresent;
  tran_please_wait:string = "Please Wait";
  filterOrder;
  constructor(
    public apiService:ApiService,
    public router:Router,
    public storage:Storage,
    public loadingCtrl: LoadingController,

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
  ionViewWillEnter(){
    this.presentLoading()
    this.storage.get('counterboy').then(data=>{
      console.log(data['id'])
      this.apiService.orderHistory(data['id']).then(data=>{
        this.orders=JSON.parse(data.data)
        this.filterOrder=this.orders;
        if(this.orders[0]){
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
      this.apiService.orderHistory(data['id']).then(data=>{

        this.orders=JSON.parse(data.data)
        this.filterOrder=this.orders;
        if(this.orders[0]){
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
  onSearchTerm(ev) {

    this.orders = this.filterOrder;
    const val = ev.detail.value;
   
    if (val && val.trim() !== '') {
      this.orders = this.orders .filter(term => {
        if (term.gift_name) {
            var name=(term.gift_name).toLowerCase()

            return name.indexOf(val.trim().toLowerCase()) > -1 
        }
        
      });
    }
  }
  openDetails(data){
    let navigationExtras: NavigationExtras = {
      queryParams: data
    };
    console.log(navigationExtras)
    this.router.navigate(['orderdetails'],navigationExtras)
  }
}
