import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { ChangeDetectorRef } from '@angular/core'; 
import { Base64 } from '@ionic-native/base64/ngx';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { ModalController } from '@ionic/angular';   
import { QrmodalPage } from '../qrmodal/qrmodal.page';
import { Sim } from '@ionic-native/sim/ngx';
declare var require: any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name;
  base;
  imageClicked=false;
  mobile_no;
  date_of_birth;
  stateName;
  cityName;
  pincode;
  address1;
  address_2;
  address_3;
  data: any;
  states: any;
  profile_pic2;
  elementType = 'text';
  QRvalue;
  counterboyid;
  gst_no;
  encodeData;
  electricianFormField = {
    name:null,
		first_name: null,
    last_name: null,
    date_of_birth: null,
		state: null,
    city: null,
    state_id: null,
    city_id: null,
    address_line_1: null,
    address_line_2: null,
    address_line_3: null,
    pincode: null,
    avatar: null,
    gst_no: null,

  };
  displayProfileField = {
    first_name: null,
    last_name: null,
    date_of_birth: null,
    state_name: null,
    city_name: null,
    address_line_1: null,
    address_line_2: null,
    address_line_3: null,
    pincode: null,
    avatar: null,
  };
  cities: any[];
  state_id;
  tran_please_wait:string = "Please Wait";
  tran_required_mobile_no:string = "Please Enter Your Mobile No";
  tran_required_first_name:string = "Please Enter Your First Name";
  tran_required_last_name:string = "Please Enter Your Last Name";
  tran_profile_updated:string = "Counter Boy Updated Successfully";
  tran_required_state:string = "Please Select Your State";
  tran_required_city:string = "Please Select Your City";
  tran_went_wrong:string = 'Something went wrong, please try again later.';
  tran_required_image:string = 'Please Choose Image';
  tran_required_date_of_birth:string = "Please Enter Date Of Birth";
  tran_required_pincode:string = "Please Enter Pincode";
  tran_required_gst:string = "Please Enter GST Number";
  showEditProfile: boolean;
  address_1: any;
  image;
  profile_image;
  file_name: string;
  base64Image: any;
  imgBlob: Blob;


  constructor(
    public storage:Storage,
    public apiService:ApiService,
    public translate: TranslateService,
    public loadingCtrl:LoadingController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    public cf : ChangeDetectorRef,
    private base64: Base64,
    public http:HttpClient,
    public http_native:HTTP,
    public modalController: ModalController,
    private sim: Sim


  ) { 
    this.showEditProfile = false;
    this.translate.get('please_wait').subscribe(res => { this.tran_please_wait = res; console.log(res)});
    this.translate.get('required_first_name').subscribe(res => { this.tran_required_first_name = res; });
    this.translate.get('required_last_name').subscribe(res => { this.tran_required_last_name = res; });
    this.translate.get('required_state').subscribe(res => { this.tran_required_state = res; });
    this.translate.get('required_city').subscribe(res => { this.tran_required_city = res; });
    this.translate.get('profile_updated').subscribe(res => { this.tran_profile_updated = res; });
    this.translate.get('went_wrong').subscribe(res => { this.tran_went_wrong = res; });
    this.translate.get('required_image').subscribe(res => { this.tran_required_image = res; });
    this.translate.get('required_date_of_birth').subscribe(res => { this.tran_required_date_of_birth = res;console.log(res) });
    this.showEditProfile = false;

    // this.sim.requestReadPermission().then(() => {
    //   console.log('Permission granted')
    //   this.sim.hasReadPermission().then(
    //     (info) => {
    //       console.log('Has permission: ', info)
    //       this.sim.getSimInfo().then(
    //         (info) => console.log('Sim info: ', info),
    //         (err) => console.log('Unable to get sim info: ', err)
    //       );
    //   }
    //   );
    // },
    //   () => console.log('Permission denied')
    // );


  }

  ngOnInit() {
    this.loadStates()

  }
  showEdit(){    
    this.showEditProfile = true;
  }
  showProfile(){
    this.showEditProfile = false;  
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: QrmodalPage,
      cssClass:'auto-height',
      componentProps:{
        'QRvalue':this.QRvalue
      }
    });
    return await modal.present();
  }
  ionViewWillEnter(){
    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.counterboyid=data['id']
      this.apiService.counterBoyProfile(data['id']).then(data=>{
      console.log('a',data)
        
      this.data= JSON.parse(data.data)
      this.name=this.data['name']
      this.mobile_no=this.data['mobile_no']
      this.date_of_birth=this.data['date_of_birth']
      this.stateName=this.data['stateName']
      this.cityName=this.data['cityName']
      this.pincode=this.data['pincode']
      this.address_1=this.data['address_1']
      this.address_2=this.data['address_2']
      this.address_3=this.data['address_3']
      this.gst_no=this.data['gst_no']
      this.state_id=this.data['state']
      this.profile_image=this.data['image']
      this.image=this.data['img']
      this.electricianFormField.state={"id":this.data['state'],"name":this.data['stateName']}
      this.electricianFormField.city={"id":this.data['city'],"name":this.data['cityName']}
      this.electricianFormField.pincode=this.data['pincode']
      this.electricianFormField.address_line_1=this.data['address_1']
      this.electricianFormField.address_line_2=this.data['address_2']
      this.electricianFormField.address_line_3=this.data['address_3']
      this.electricianFormField.date_of_birth=this.data['date_of_birth']
      this.electricianFormField.gst_no=this.data['gst_no']
      this.electricianFormField.name=this.data['name']
      this.QRvalue=this.data['mobile_no']

    })

    })

  }
  loadStates(){
    this.apiService.states().then(
      data => this.handleStates(data),
    ).catch(error => {
      console.log(error)
    })
  }

  handleStates(data){
    console.log('state',data)
    this.states = JSON.parse(data.data);
    
    var selectedItem = this.states.find(
      t => t.id == this.electricianFormField.state_id
    );
    var indexNo = this.states.indexOf(selectedItem);
    if (indexNo != -1) {
      this.electricianFormField.state = this.states[indexNo];
    }

    if(this.electricianFormField.state){
      this.loadCities(this.state_id);
    }
  }

  changeState(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    this.cities = [];
    this.electricianFormField.city = null;
    this.electricianFormField.city_id = null;
    this.electricianFormField.state_id = event.value.id;
    this.loadCities(event.value.id);
  }

  

  loadCities(state_id){
  	this.apiService.cities(state_id).then(
      data => this.handleCities(data),
     
    ).catch(error => {
      console.log(error)
    })
  }

  handleCities(data){
    console.log('cities',data)
    // if(this.othercity==null){
      this.cities = JSON.parse(data.data)
      
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

  profileForm(){
   

    if(this.electricianFormField.name == '' || this.electricianFormField.name == null){
      this.apiService.presentToast(this.tran_required_first_name,3000);
    }
    else if(this.electricianFormField.pincode == '' || this.electricianFormField.pincode == null){
      this.apiService.presentToast(this.tran_required_pincode,3000);
    }
    else if(this.electricianFormField.state == '' || this.electricianFormField.state == null){
      this.apiService.presentToast(this.tran_required_state,3000);
    }
    else if(this.electricianFormField.city == '' || this.electricianFormField.city == null){
      this.apiService.presentToast(this.tran_required_city,3000);
    }
    else if(this.electricianFormField.date_of_birth == '' || this.electricianFormField.date_of_birth == null){
      this.apiService.presentToast(this.tran_required_date_of_birth,3000);
    }
    else if(this.electricianFormField.gst_no == '' || this.electricianFormField.gst_no == null){
      this.apiService.presentToast(this.tran_required_gst,3000);
    }
    else{
      this.presentLoading()
      if(this.electricianFormField.date_of_birth ){
        this.electricianFormField.date_of_birth =(this.electricianFormField.date_of_birth ).split('T')[0]
      }
        var electricianFormField = {
          'name': this.electricianFormField.name,
          'date_of_birth':this.electricianFormField.date_of_birth,
          'state': this.electricianFormField.state.id,
          'city': this.electricianFormField.city.id,
          'pincode':this.electricianFormField.pincode,
          'address_1': this.electricianFormField.address_line_1,
          'address_2': this.electricianFormField.address_line_2,
          'address_3': this.electricianFormField.address_line_3,
          'counterboyid':this.counterboyid,
          'gst_no':this.electricianFormField.gst_no,
          'oldimage':this.image,
          'image':this.file_name,
          'base64':this.base

      };
      // var formData= new FormData()
      // formData.append('name',this.electricianFormField.name)
      // formData.append('date_of_birth',this.electricianFormField.date_of_birth)
      // formData.append('state',this.electricianFormField.state)
      // formData.append('city',this.electricianFormField.city)
      // formData.append('pincode',this.electricianFormField.pincode)
      // formData.append('address_1',this.electricianFormField.address_line_1)
      // formData.append('address_2',this.electricianFormField.address_line_2)
      // formData.append('address_3',this.electricianFormField.address_line_3)
      // formData.append('counterboyid',this.counterboyid)
      // formData.append('gst_no',this.electricianFormField.gst_no)
      // formData.append('oldimage',this.image)
      // formData.append('image',this.file_name)
      // formData.append('base64',this.base)
      console.log('edit',electricianFormField)
      // this.http
      // .post("https://smartwiremen.com/iso_app/counter_boy/api/update_counter_boy.php", formData, {
      //   observe: "response",
      // }).subscribe(data=>{
      //     this.loadingCtrl.dismiss()
          
          
      //     console.log(data)
      //     this.apiService.presentToast(this.tran_profile_updated,3000).then(data=>{
      //       this.showEditProfile=false;
      //       this.ionViewWillEnter()
      //     })
      //   },error=>{
      //     this.handleError(error)
      //   })
        this.http_native.setDataSerializer('json')
        this.http_native.post("https://smartwiremen.com/iso_app/counter_boy/api/update_counter_boy.php",electricianFormField,{}).then(data=>{
          this.loadingCtrl.dismiss()
          
        this.apiService.presentToast(data.data,3000).then(data=>{
            this.showEditProfile=false;

            this.ionViewWillEnter()
          }).catch(error=>{
          this.loadingCtrl.dismiss()

          this.handleError(error)

          })
        })
    }
  }
  handleResponse(data) {
    this.loadingCtrl.dismiss()
	}

	handleError(error) {
    this.loadingCtrl.dismiss()
    
		let errorMsg = '';
		if(error.status == 401){
		  errorMsg = JSON.parse(error.error)['message'];
		}else{
      errorMsg = JSON.parse(error.error)['error'];
    }
		
		if(errorMsg != ''){
		  this.apiService.presentToast(errorMsg,3000);
		}
  }
  ionViewDidLeave(){
    this.showEditProfile=false;
  }
  takePhoto(){
    this.imageClicked=true;

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
     this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
      entry.file(file => {
        console.log(file);
        this.file_name=file.name
        this.base64Image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
        this.base64.encodeFile(imageData).then((base64File: string) => {
          let imageSrc = base64File.split(",");
          this.base=imageSrc[1];

        }, (err) => {
          console.log(err);
        });
        this.cf.detectChanges();
        this.readFile(file);
      });
    });
    }, (err) => {
     this.base64Image = null;      
    });
  }

  getImage(){
    this.imageClicked=true;
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
     this.profile_pic2 = 'data:image/jpeg;base64,' + imageData;

      this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          this.file_name=file.name
          this.base64Image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
          this.base64.encodeFile(imageData).then((base64File: string) => {
            let imageSrc = base64File.split(",");
            this.base=imageSrc[1];
          }, (err) => {
            console.log(err);
          });
          this.cf.detectChanges();
          this.readFile(file);
        });
      });
    //  this.profile_pic = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.base64Image = null;
    });
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imgBlob = new Blob([reader.result], {
        type: file.type
      });
     
     
    };
    reader.readAsArrayBuffer(file);
  }

  doRefresh(event){
    this.storage.get('counterboy').then(data=>{
      console.log(data)
      this.counterboyid=data['id']
      this.apiService.counterBoyProfile(data['id']).then(data=>{
      console.log('a',data)
        
      this.data= JSON.parse(data.data)
      this.name=this.data['name']
      this.mobile_no=this.data['mobile_no']
      this.date_of_birth=this.data['date_of_birth']
      this.stateName=this.data['stateName']
      this.cityName=this.data['cityName']
      this.pincode=this.data['pincode']
      this.address_1=this.data['address_1']
      this.address_2=this.data['address_2']
      this.address_3=this.data['address_3']
      this.gst_no=this.data['gst_no']
      this.state_id=this.data['state']
      this.profile_image=this.data['image']
      this.image=this.data['img']
      this.electricianFormField.state={"id":this.data['state'],"name":this.data['stateName']}
      this.electricianFormField.city={"id":this.data['city'],"name":this.data['cityName']}
      this.electricianFormField.pincode=this.data['pincode']
      this.electricianFormField.address_line_1=this.data['address_1']
      this.electricianFormField.address_line_2=this.data['address_2']
      this.electricianFormField.address_line_3=this.data['address_3']
      this.electricianFormField.date_of_birth=this.data['date_of_birth']
      this.electricianFormField.gst_no=this.data['gst_no']
      this.electricianFormField.name=this.data['name']
      this.QRvalue=this.data['mobile_no']


      event.target.complete()
    }).catch(error=>{
      event.target.complete()

    })

    })
  }
 

  // getCarrier(){
  //   const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
  //   const number = phoneUtil.parseAndKeepRawInput('9619750420', 'IN');
  //   console.log(number.getCountryCode());
  //   console.log(number.getCountryCodeSource());
  //   console.log(number.getExtension());
  //   console.log(number.getItalianLeadingZero());
  //   console.log(number.getNationalNumber());
  //   console.log(number.getRawInput());
  //   console.log()
  // }

}