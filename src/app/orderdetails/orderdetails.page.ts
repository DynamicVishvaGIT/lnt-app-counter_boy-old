import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {
  order_data;
  constructor(
    public route:ActivatedRoute,
    public router:Router
  ) { }
  
  ngOnInit() {
  }
  ionViewDidEnter(){
    this.route.queryParams.subscribe(params => {
      this.order_data= params;
      console.log(this.order_data)
     
  });
  }
}
