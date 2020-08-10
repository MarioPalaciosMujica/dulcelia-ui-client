import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ProductService } from "./../../../shared/services/product.service";
// import { Product } from "./../../../shared/classes/product";
import { ProductService } from './../../../core/services/product.service';
import { Product } from './../../../shared/models/product.model';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  public products: Product[] = [];

  constructor(private router: Router, 
    public productService: ProductService) {
    this.productService.compareItems.subscribe(response => {
      this.products = response;
    });
  }

  ngOnInit(): void {
    registerLocaleData(es);
  }

  async addToCart(product: any) {
    const status = await this.productService.addToCart(product);
    if(status) {
      this.router.navigate(['/tienda/carro']);
    }
  }

  removeItem(product: any) {
    this.productService.removeCompareItem(product);
  }

}
