import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
// import { Product } from "../../../classes/product";
// import { ProductService } from "../../../services/product.service";
import { ProductService } from './../../../../core/services/product.service';
import { Product } from '../../../models/product.model';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-product-box-two',
  templateUrl: './product-box-two.component.html',
  styleUrls: ['./product-box-two.component.scss']
})
export class ProductBoxTwoComponent implements OnInit {

  @Input() product: Product;
  @Input() currency: any = null; //this.productService.Currency; // Default Currency
  @Input() cartModal: boolean = false; // Default False
  
  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public ImageSrc : string

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    registerLocaleData(es);
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

  // Change Variants
  // ChangeVariants(color, product) {
  //   product.variants.map((item) => {
  //     if (item.color === color) {
  //       product.images.map((img) => {
  //         if (img.image_id === item.image_id) {
  //           this.ImageSrc = img.src;
  //         }
  //       })
  //     }
  //   })
  // }

  ChangeVariantsImage(src) {
    this.ImageSrc = src;
  }

  addToCart(product: any) {
    this.productService.addToCart(product);
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    this.productService.addToCompare(product);
  }

}
