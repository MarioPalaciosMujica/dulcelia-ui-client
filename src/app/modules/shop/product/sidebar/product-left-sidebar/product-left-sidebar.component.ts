import { Option } from './../../../../../shared/models/option.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from './../../../../../shared/data/slider';
import { Product } from './../../../../../shared/models/product.model';
import { ProductService } from './../../../../../core/services/product.service';
import { SizeModalComponent } from "./../../../../../shared/components/modal/size-modal/size-modal.component";
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

  public product: Product;
  public activeSlide: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  public newProductList: Product[];
  public relatedProductList: Product[];

  public isProductLoaded: boolean;
  public isRelatedProductsLoaded: boolean;
  public isNewProductLoaded: boolean;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public productService: ProductService
  ) 
  { 
    this.product = {};
    this.isProductLoaded = false;
    this.isRelatedProductsLoaded = false;
    this.isNewProductLoaded = false;
  }

  ngOnInit(): void {
    registerLocaleData(es);
    this.getProduct();
  }

  private getProduct(){
    this.route.paramMap.subscribe(paramMap => {

      this.productService.findById(Number(paramMap.get('idProduct'))).subscribe(data => {
        this.product = data as Product;
        this.product.quantity = 1;
        this.isProductLoaded = true;
      });

      // MOCK
      // let id = Number(paramMap.get('idProduct'));
      // this.productService.findAllActives().subscribe(data => {
      //   let productList: Product[] = data as Product[];
      //   this.product = productList.find(el => el.idProduct = id);
      //   this.product.quantity = 1;
      //   this.isProductLoaded = true;
      // });
    });
  }

  selectVariant(idVariant: number) {
    this.product = this.productService.changeVariant(this.product, idVariant);
  }

  selectOption(values: any) {
    let opt: Option = null;
    for(let option of this.product.options){
      if(option.idOption == values.currentTarget.defaultValue){
        opt = option;
      }
    }
    this.product = this.productService.changeOptions(this.product, opt, values.currentTarget.checked);
  }

  // Get Product Color
  // Color(variants) {
  //   const uniqColor = []
  //   for (let i = 0; i < Object.keys(variants).length; i++) {
  //     if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
  //       uniqColor.push(variants[i].color)
  //     }
  //   }
  //   return uniqColor
  // }

  // Get Product Size
  // Size(variants) {
  //   const uniqSize = []
  //   for (let i = 0; i < Object.keys(variants).length; i++) {
  //     if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
  //       uniqSize.push(variants[i].size)
  //     }
  //   }
  //   return uniqSize
  // }

  // selectSize(size) {
  //   this.selectedSize = size;
  // }
  
  increment() {
    //this.counter++ ;
    this.product.quantity++;
  }

  decrement() {
    //if (this.counter > 1) this.counter-- ;
    if(this.product.quantity > 1){
      this.product.quantity--;
    }
  }

  // Add to cart
  async addToCart(product: any) {
    //product.quantity = this.counter || 1;
    //product.quantity = 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/tienda/carro']);
  }

  // Buy Now
  async buyNow(product: any) {
    //product.quantity = this.counter || 1;
    //product.quantity = 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/tienda/pago']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
