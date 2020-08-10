import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from './../../../../../shared/data/slider';
// import { Product } from './../../../../../shared/classes/product';
import { Product } from './../../../../../shared/models/product.model';
//import { ProductService } from './../../../../../shared/services/product.service';
import { ProductService } from './../../../../../core/services/product.service';
import { SizeModalComponent } from "./../../../../../shared/components/modal/size-modal/size-modal.component";
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

  public product: Product;
  //public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  public newProductList: Product[];
  public relatedProductList: Product[];

  public isProductLoaded : boolean;
  public isRelatedProductsLoaded: boolean;
  public isNewProductLoaded: boolean;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public productService: ProductService) 
    { 
      //this.route.data.subscribe(response => this.product = response.data );
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
    });
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }
  
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
