import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { OrderconfirmationPage } from '../orderconfirmation/orderconfirmation.page';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.page.html',
  styleUrls: ['./redeem.page.scss'],
})
export class RedeemPage implements OnInit {
  tran_went_wrong:string = 'Something went wrong, please try again later.';
  tran_please_wait:string = "Please Wait";
  tran_required_qty:string = "Please Enter Quantity";
  tran_order_success:string = "Gift Order Created Successfully";
  gift_qty1=0;
  gift_qty2=0;
  gifts;
  redeemgifts;
  counterboyid;
  quantity: any;
  selected_gift;
  filterGift;
  constructor(
    public apiService:ApiService,
    public storage:Storage,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,

  ) { }

  ngOnInit() {
    this.presentLoading()

   
  }
  ionViewWillEnter() {

    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.counterboyid=data['id']
    }).catch(err=>{
      console.log(err)
  
    })
    this.apiService.gift().then(data=>{
      console.log('gift',data)
      this.loadingCtrl.dismiss()
      this.gifts=JSON.parse(data.data)
      this.filterGift=this.gifts
    }).catch(err=>{
      console.log(err)
      this.loadingCtrl.dismiss()
  
    })

  }
  incrementQty(item) {
    if(isNaN(item.qty)){
      item.qty = 1;
    }else{
      item.qty += 1;
    }
  }

  decrementQty(item) {
    if(item.qty-1 < 0 ){
      item.qty = 0
    }else{
      item.qty -= 1;
    }
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
  orderGift(gift){
    this.quantity = gift.qty ? gift.qty : 0;
    if(this.quantity  == 0){
      this.apiService.presentToast(this.tran_required_qty,3000);
    }
    else{
      this.selected_gift = gift;
      this.presentLoading()

      console.log("test",gift)
      var gift_data={
        "counterboyid":this.counterboyid,
        "giftid":gift.id,
        "qty":this.quantity
      }
      console.log('gift_data',gift_data)
      this.apiService.redeemGift(gift_data).then(data=>{
        this.loadingCtrl.dismiss();
        this.redeemgifts=JSON.parse(data.data)
        if(this.redeemgifts.msg == 220){
          this.handleReedemGiftResponse(data)
          // console.log("test1",data)
          // console.log("test2",this.redeemgifts.json)
        }else{
          this.apiService.presentToast(this.redeemgifts.json,3000);
        }
      }).catch(err=>{
        this.loadingCtrl.dismiss();
        // console.log(err.msg)
        this.handleReedemGiftError(err)
      })
    }
  }
  async presentOrderConfirmationModal() {
    const modal = await this.modalCtrl.create({
      component: OrderconfirmationPage,
      cssClass: 'my-custom-class',
      componentProps:{
        'gift' : this.selected_gift,
      }
    });
    return await modal.present();
  }
  handleReedemGiftResponse(data) {
    this.loadingCtrl.dismiss();
    this.presentOrderConfirmationModal();
  }
  handleReedemGiftError(error) {
    this.loadingCtrl.dismiss();
    let toast = this.toastCtrl.create({
      message: '',
      duration: 1000,
      position: 'middle'
    });
    console.log(error.status)
    let errorMsg = '';
    if(error.status == 401){
      errorMsg = error.error.message;
    }else{
      errorMsg = error.error.error;
    }
    if(errorMsg != ''){
      this.apiService.presentToast(errorMsg,3000);
    }
  }
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position:'middle'
    });
    toast.present();
  }
  onSearchTerm(ev) {

    this.gifts = this.filterGift;
    const val = ev.detail.value;
   
    if (val && val.trim() !== '') {
      this.gifts = this.gifts.filter(term => {
        if (term.gift_name) {
            var name=(term.gift_name).toLowerCase()

            return name.indexOf(val.trim().toLowerCase()) > -1 
        }
        
      });
    }
  }
  doRefresh(event){
    this.apiService.gift().then(data=>{
      console.log('gift',data)
      this.loadingCtrl.dismiss()
      this.gifts=JSON.parse(data.data)
      this.filterGift=this.gifts
      event.target.complete()
    }).catch(err=>{
      console.log(err)
      this.loadingCtrl.dismiss()
      event.target.complete()

  
    })

  }
}
