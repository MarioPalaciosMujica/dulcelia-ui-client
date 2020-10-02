import { PurchaseOrderService } from './../../../../core/services/purchase-order.service';
import { PurchaseOrder } from './../../../../shared/models/purchase-order.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from './../../../../shared/classes/order';
//import { OrderService } from './../../../../shared/services/order.service';
//import { ProductService } from './../../../../shared/services/product.service';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  //public orderDetails : Order = {};
  public purchaseOrder: PurchaseOrder = {};
  public isLoaded: boolean = false;

  constructor(
    // public productService: ProductService,
    // private orderService: OrderService,
    private purchaseOrderService: PurchaseOrderService,
    private route: ActivatedRoute, 
    private router: Router,
  ) { 
    this.route.paramMap.subscribe(paramMap => {
      if(paramMap.has("id")){
        this.purchaseOrderService.findById(Number(paramMap.get('id'))).subscribe(data => {
          this.purchaseOrder = data as PurchaseOrder;
          this.isLoaded = true;
          console.log("purchaseOrder");
          console.log(this.purchaseOrder);
        });
      }
    });
  }

  ngOnInit(): void {	
    //this.orderService.checkoutItems.subscribe(response => this.orderDetails = response);
  }

  ngAfterViewInit() {
    
  }

}
