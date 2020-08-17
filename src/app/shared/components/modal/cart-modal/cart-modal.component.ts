import { ProductMockService } from './../../../../core/mocks/product-mock.service';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input, AfterViewInit,
  Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ProductService } from "../../../services/product.service";
// import { Product } from "../../../classes/product";
import { ProductService } from './../../../../core/services/product.service';
import { Product } from './../../../models/product.model';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';


@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() product: Product;
  @Input() currency : any;
  
  @ViewChild("cartModal", { static: false }) CartModal: TemplateRef<any>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public products: any[] = [];

  public isDataLoaded: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private productService: ProductService,
    private productMockService: ProductMockService
  ) 
  {
    this.isDataLoaded = false;
  }

  ngOnInit(): void {
    registerLocaleData(es);
  }

  ngAfterViewInit(): void {
  }

  async openModal(product: Product) {
    //await this.productService.getProducts.subscribe(response => this.products = response);
    //this.products = await this.products.filter(items => items.category == product.category && items.id != product.id);
    
    // this.productService.findAllActivesByCategory(product.categories[0].idCategory).subscribe(data => {
    //   this.products = data as Product[];
    //   this.isDataLoaded = true;
    // });

    //MOCK
    this.productMockService.findAllActives().subscribe(data => {
      this.products = [];
      let allProducts: Product[] = data as Product[];
      allProducts.forEach(prod => {
        prod.categories.forEach(cat => {
          if(cat.idCategory == product.categories[0].idCategory && !this.products.includes(this.product)){
            this.products.push(prod);
          }
        })
      });
      this.isDataLoaded = true;
    });
    
    const status = await this.productService.addToCart(product);
    if(status) {
      this.modalOpen = true;
      if (isPlatformBrowser(this.platformId)) { // For SSR 
        this.modalService.open(this.CartModal, { 
          size: 'lg',
          ariaLabelledBy: 'Cart-Modal',
          centered: true,
          windowClass: 'theme-modal cart-modal CartModal'
        }).result.then((result) => {
          `Result ${result}`
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    if(this.modalOpen){
      this.modalService.dismissAll();
    }
  }

}
