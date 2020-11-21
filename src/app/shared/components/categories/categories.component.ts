//import { CategoryMockService } from './../../../core/mocks/category-mock.service';
import { Category } from './../../models/category.model';
import { CategoryService } from './../../../core/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
//import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
// import { Product } from '../../classes/product';
// import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  // public products: Product[] = [];
  public collapse: boolean = true;
  public isDataLoaded: boolean;
  public categories: Category[];
  public catalogueName: string;
  private subscriptions$: Subscription[] = []

  constructor(
    // public productService: ProductService,
    private store: Store<any>,
    public categoryService: CategoryService,
    //private categoryMockService: CategoryMockService
  ) { 
    //this.productService.getProducts.subscribe(product => this.products = product);
    this.isDataLoaded = false;
    this.categories = [];

    this.getAllCategories();
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscriptions$.forEach(el => el.unsubscribe());
  }

  private getAllCategories(){
    // this.categoryService.findAll().subscribe(data => {
    //   this.categories = data as Category[];
    //   this.isDataLoaded = true;
    // });

    const getCategories$: Subscription = this.store.select('categoryReducer').subscribe(data => {
      this.categories = data.categories as Category[];
      this.store.select('categoryReducer').subscribe(data => {
        this.catalogueName = data.catalogue as string;
        this.isDataLoaded = true;
      });
    });
    this.subscriptions$.push(getCategories$);

    //MOCK
    // this.categoryMockService.findAll().subscribe(data => {
    //   this.categories = data as Category[];
    //   this.isDataLoaded = true;
    // });
  }

  // get filterbyCategory() {
  //   const category = [...new Set(this.products.map(product => product.type))]
  //   return category
  // }

}
