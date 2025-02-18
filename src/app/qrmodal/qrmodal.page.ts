import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';   

@Component({
  selector: 'app-qrmodal',
  templateUrl: './qrmodal.page.html',
  styleUrls: ['./qrmodal.page.scss'],
})
export class QrmodalPage implements OnInit {
  elementType = 'text';
  @Input() QRvalue;
  constructor(
    public modalController: ModalController

  ) { }

  ngOnInit() {
    console.log(this.QRvalue)
  }
  dissmiss(){
    this.modalController.dismiss()
  }
}
