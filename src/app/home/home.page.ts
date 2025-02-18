import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userName;
  profile_picture;
  redeem;
  balance: any;
  total: any;
  img;
  constructor(
    public router:Router,
    private storage:Storage,
    public apiService:ApiService
  ) {

  }
  ionViewDidEnter(){
    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.apiService.counterBoyProfile(data['id']).then(data=>{
        this.userName=  JSON.parse(data.data)['name'];
        this.profile_picture=JSON.parse(data.data)['image'];
        this.img=JSON.parse(data.data)['img'];

    
    })
    this.apiService.counterBoyPoints(data['id']).then(data=>{
      console.log(data)
      this.redeem=(JSON.parse(data.data)['redeem']).toString()
      this.balance=(JSON.parse(data.data)['balance']).toString()
      this.total=(JSON.parse(data.data)['total']).toString()
    }).catch(error=>{
      console.log(error)
    })
    })
  }
  openElectrician(){
    this.router.navigate(['electricians'])
  }
  openScanCode(){
    this.router.navigate(['scancode'])
  }
  openPointsHistory(){
    this.router.navigate(['pointshistory'])
  }
  openRedeem(){
    this.router.navigate(['redeem'])
  }
  openOrderHistory(){
    this.router.navigate(['orders'])
  }
  openPassbook(){
    this.router.navigate(['passbook'])
  }
  doLogout(){
    this.storage.remove('counterboy').then(_=>{
      this.router.navigate(['login'])
    })
  }
  doRefresh(event){
    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.apiService.counterBoyProfile(data['id']).then(data=>{
        this.userName=  JSON.parse(data.data)['name'];
        this.profile_picture=JSON.parse(data.data)['image'];
        this.img=JSON.parse(data.data)['img'];

        event.target.complete()

    
    }).catch(error=>{
      event.target.complete()

    })
    this.apiService.counterBoyPoints(data['id']).then(data=>{
      console.log(data)
      this.redeem=(JSON.parse(data.data)['redeem']).toString()
      this.balance=(JSON.parse(data.data)['balance']).toString()
      this.total=(JSON.parse(data.data)['total']).toString()
      event.target.complete()

    }).catch(error=>{
      event.target.complete()

      console.log(error)
    })
    })
  }
}
