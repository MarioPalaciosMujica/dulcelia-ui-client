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
    public productService: ProductService
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
        // console.log('getRelatedProduct()');
        // console.log(this.relatedProducts);
      });
    }
  }

}
