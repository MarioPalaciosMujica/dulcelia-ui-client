import { Router } from '@angular/router';
import { WpInitTransactionOutputModel } from './../../../shared/models/wpInitTransactionOutput.model';
import { WebpayService } from './../../../core/services/webpay.service';
import { ProductService } from './../../../core/services/product.service';
import { Product } from './../../../shared/models/product.model';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from './../../../../environments/environment';
import { OrderService } from "./../../../shared/services/order.service";
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:  FormGroup;
  public products: Product[] = [];
  public payPalConfig ? : IPayPalConfig;
  // public payment: string = 'Stripe';
  public payment: string = 'Webpay';
  public wpInitTransactionOutput: WpInitTransactionOutputModel;
  public amount:  any;
  @Inject(DOCUMENT) private document: any

  constructor(private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService,
    private webpayService: WebpayService,
    private router: Router,
    private  http : HttpClient
  ) { 

    // this.checkoutForm = this.fb.group({
    //   firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
    //   lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
    //   phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    //   email: ['', [Validators.required, Validators.email]],
    //   address: ['', [Validators.required, Validators.maxLength(50)]],
    //   country: ['', Validators.required],
    //   town: ['', Validators.required],
    //   state: ['', Validators.required],
    //   postalcode: ['', Validators.required]
    // });

    this.checkoutForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      phone: [''],
      email: [''],
      address: [''],
      country: [''],
      town: [''],
      state: [''],
      postalcode: ['']
    })
  }

  ngOnInit(): void {
    registerLocaleData(es);
    this.productService.cartItems.subscribe(response => this.products = response);
    this.getTotal.subscribe(amount => this.amount = amount);
    this.initConfig();
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  webpayCheckout(){
    console.log('apiWebpayClient()');
    this.webpayService.initTransactionOutput().subscribe(data => {
      this.wpInitTransactionOutput = data as WpInitTransactionOutputModel;
      //this.router.navigate(['/tienda/webpay'], { state : this.wpInitTransactionOutput });
      //this.http.post(this.wpInitTransactionOutput.formAction, { token_ws: this.wpInitTransactionOutput.tokenWs });

      var form = document.createElement('form');
      form.setAttribute('method', 'POST');
      form.setAttribute('action', this.wpInitTransactionOutput.formAction);
      var hidden = document.createElement('input');
      hidden.setAttribute('type', 'hidden');
      hidden.setAttribute('name', 'token_ws');
      hidden.setAttribute('value', this.wpInitTransactionOutput.tokenWs);
      form.appendChild(hidden);
      document.body.appendChild(form);
      form.submit();
    });

    
  }

  // Stripe Payment Gateway
  stripeCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
      }
    });
    handler.open({
      name: 'Multikart',
      description: 'Online Fashion Store',
      amount: this.amount * 100
    }) 
  }

  // Paypal Payment Gateway
  private initConfig(): void {
    this.payPalConfig = {
        currency: null, //this.productService.Currency.currency,
        clientId: environment.paypal_token,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                currency_code: null, //this.productService.Currency.currency,
                value: this.amount,
                breakdown: {
                    item_total: {
                        currency_code: null, //this.productService.Currency.currency,
                        value: this.amount
                    }
                }
              }
          }]
      },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            size:  'small', // small | medium | large | responsive
            shape: 'rect', // pill | rect
        },
        onApprove: (data, actions) => {
            this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
  }

}
