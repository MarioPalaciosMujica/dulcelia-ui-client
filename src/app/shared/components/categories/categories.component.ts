import { Category } from './../../models/category.model';
import { CategoryService } from './../../../core/services/category.service';
import { Component, OnInit } from '@angular/core';
// import { Product } from '../../classes/product';
// import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  // public products: Product[] = [];
  public collapse: boolean = true;
  public isDataLoaded: boolean;
  public categories: Category[];

  constructor(
    // public productService: ProductService,
    public categoryService: CategoryService
  ) { 
    //this.productService.getProducts.subscribe(product => this.products = product);
    this.isDataLoaded = false;
    this.categories = [];
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories(){
    this.categoryService.findAll().subscribe(data => {
      this.categories = data as Category[];
      this.isDataLoaded = true;
    });
  }

  // get filterbyCategory() {
  //   const category = [...new Set(this.products.map(product => product.type))]
  //   return category
  // }

}
