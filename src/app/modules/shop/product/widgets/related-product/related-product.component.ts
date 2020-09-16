import { ProductMockService } from './../../../../../core/mocks/product-mock.service';
import { ProductService } from './../../../../../core/services/product.service';
import { Product } from './../../../../../shared/models/product.model';
import { Component, OnInit, Input } from '@angular/core';
//import { Product } from './../../../../../shared/classes/product';
//import { ProductService } from './../../../../../shared/services/product.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {
  
  //@Input() type: string
  @Input('product') public product: Product;

  //public products: Product[] = [];
  public relatedProducts: Product[];
  public isDataLoaded: boolean;

  constructor(
    public productService: ProductService,
    private productMockService: ProductMockService
  ) { 
    // this.productService.getProducts.subscribe(response => 
    //   this.products = response.filter(item => item.type == this.type)
    // );
    this.relatedProducts = [];
    this.isDataLoaded = false;
  }

  ngOnInit(): void {
    registerLocaleData(es);
    this.getRelatedProduct();
  }

  private getRelatedProduct(){
    if(this.product.tags.length > 1){

      this.productService.findAllActivesByTags(this.product.tags).subscribe(data => {
        this.relatedProducts = data as Product[];
        this.isDataLoaded = true;
      });

      //MOCK
      // this.productMockService.findAllActives().subscribe(data => {
      //   this.relatedProducts = [];
      //   let allProducts: Product[] = data as Product[];
      //   allProducts.forEach(prod => {
      //     this.product.tags.forEach(viewTag => {
      //       prod.tags.forEach(prodTag => {
      //         if(viewTag.idTag == prodTag.idTag && !this.relatedProducts.includes(prod)){
      //           this.relatedProducts.push(prod);
      //         }
      //       })
      //     })
      //   });
      //   this.isDataLoaded = true;
      // });

    }

  }

}
