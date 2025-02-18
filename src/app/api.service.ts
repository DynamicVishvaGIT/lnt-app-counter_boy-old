import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://smartwiremen.com/iso_app/counter_boy/api';
  accessToken : string; 
  userData: any;
  constructor(
    public http:HTTP,
    public http_client: HttpClient,
    public tokenService: TokenService,
    public toastCtrl:ToastController,
    private storage:Storage

  ) { }

  async presentToast(message,duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position:'bottom',
      mode:'ios',
      color:'dark'
    });
    toast.present();
  }
  login(data) {
    return this.http.post(`${this.baseUrl}/login.php`,{},data)
  }
  send_otp(){
    return this.http.post(`${this.baseUrl}/sendOTP`,{},{})
  }
  verify_otp(username,code){
    console.log(username,code)
    return this.http.post(`${this.baseUrl}/validate_otp.php`,{},{'Username' : username,'Otp' : code.toString()})
  }
  verifyGift(Username,Otp,gift){
    return this.http.post(`${this.baseUrl}/verify_gift.php`,gift,{'Username' : Username,'Otp' : Otp.toString()})

  }
  electricianList(Counterboyid){
    return this.http.post(`${this.baseUrl}/electrician_list.php`,{},{'Counterboyid' : Counterboyid})
  }
  electricianDetail(Counterboyid,Electricianid){
    return this.http.post(`${this.baseUrl}/electrician_details.php`,{},{'Counterboyid' : Counterboyid,'Electricianid':Electricianid})
  }
  gift(){
    return this.http.post(`${this.baseUrl}/gift.php`,{},{})
  }
  parentId(userId){
    return this.http.post(`${this.baseUrl}/parent_id.php`,{},{'Userid':userId})
  }
  states() {
    return this.http.post(`${this.baseUrl}/state.php`,{},{})
  }
  cities(state_id) {
    return this.http.post(`${this.baseUrl}/city.php`,{},{'Stateid':state_id})
  }
  addElectrician(data){
    console.log('added',data)
    this.http.setDataSerializer('json')
    return this.http.post(`${this.baseUrl}/add_electrician.php`,data,{})
  }
  redeemGift(data){
    this.http.setDataSerializer('json')
    return this.http.post(`${this.baseUrl}/redeem_gift.php`,data,{})
  }
  orderHistory(Counterboyid){
    return this.http.post(`${this.baseUrl}/order_history.php`,{},{'Counterboyid' : Counterboyid})
  }
  counterBoyPoints(Counterboyid){
    return this.http.post(`${this.baseUrl}/counter_boy_points.php`,{},{'Counterboyid':Counterboyid})
  }
  updateCounterBoy(data){
    return this.http_client.post(`${this.baseUrl}/update_counter_boy.php`,data)
  }
  electricianPointsDate(Counterboyid){
    return this.http.post(`${this.baseUrl}/electrician_points_date.php`,{},{'Counterboyid':Counterboyid})
  }
  pointByElectrician(Counterboyid){
    return this.http.post(`${this.baseUrl}/point_by_electrician.php`,{},{'Counterboyid':Counterboyid})
  }
  dailyElectricianPoints(Counterboyid,date){
    this.http.setDataSerializer('json')
    return this.http.post(`${this.baseUrl}/daily_ele_points.php`,{'counterboyid':Counterboyid,"todaydate":date},{})
  }
  counterBoyProfile(Counterboyid){
    return this.http.post(`${this.baseUrl}/counter_boy_profile.php`,{},{'Counterboyid':Counterboyid})
  }
  fetchFeedback(Counterboyid){
    return this.http.post(`${this.baseUrl}/fetch_feedback.php`,{},{'Counterboyid':Counterboyid})
  }
  addFeedback(data){
    this.http.setDataSerializer('json')
    return this.http.post(`${this.baseUrl}/add_feedback.php`,data,{})
  }
}
