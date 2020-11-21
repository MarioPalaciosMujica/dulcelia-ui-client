import { CategoryService } from './../../../../core/services/category.service';
import { CataloguesEnum } from './../../../../shared/enums/calalogues.enum';
import { Observable, Subscription } from 'rxjs';
//import { TagMockService } from './../../../../core/mocks/tag-mock.service';
//import { CategoryMockService } from './../../../../core/mocks/category-mock.service';
//import { ProductMockService } from './../../../../core/mocks/product-mock.service';
import { TagService } from './../../../../core/services/tag.service';
import { Tag } from './../../../../shared/models/tag.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
//import { ProductService } from "./../../../../shared/services/product.service";
//import { Product } from './../../../../shared/classes/product';
import { ProductService } from './../../../../core/services/product.service';
import { Product } from './../../../../shared/models/product.model';
import { Category } from 'src/app/shared/models/category.model';
import { Store } from '@ngrx/store';
import { CategoryActionTypes } from './../../../../core/actions/category.actions';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit, OnDestroy {
  
  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  //public products: Product[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1200;
  //public tags: any[] = [];
  public category: string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;

  public products: Product[];
  public newProducts: Product[];
  public tags: Tag[];
  public isMainProductsLoaded: boolean;
  public isNewProductsLoaded: boolean;
  public isTagsLoaded: boolean;

  public title: string = "catálogo";

  private subscriptions$: Subscription[] = [];

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute, 
    private router: Router,
    private viewScroller: ViewportScroller, 
    private productService: ProductService,
    private tagService: TagService,
    private categoryService: CategoryService
    //private productMockService: ProductMockService,
    //private categoryMockService: CategoryMockService,
    //private tagMockservice: TagMockService
  ) 
  {  
      this.products = [];
      this.newProducts = [];
      this.tags = [];
      this.isMainProductsLoaded = false;
      this.isNewProductsLoaded = false;
      this.isTagsLoaded = false;
    
      //... Get Query params..
      // this.route.queryParams.subscribe(params => {
      //   this.brands = params.brand ? params.brand.split(",") : [];
      //   this.colors = params.color ? params.color.split(",") : [];
      //   this.size  = params.size ? params.size.split(",")  : [];
      //   this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
      //   this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
      //   this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array
        
      //   this.category = params.category ? params.category : null;
      //   this.sortBy = params.sortBy ? params.sortBy : 'ascending';
      //   this.pageNo = params.page ? params.page : this.pageNo;

      //   //... Get Filtered Products..
      //   this.productService.filterProducts(this.tags).subscribe(response => {         
      //     //... Sorting Filter
      //     this.products = this.productService.sortProducts(response, this.sortBy);
      //     //... Category Filter
      //     if(params.category)
      //       this.products = this.products.filter(item => item.type == this.category);
      //     //... Price Filter
      //     this.products = this.products.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice) 
      //     //... Paginate Products
      //     this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
      //     this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
      //   })
      // });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      // if(paramMap.has('catalogue')){
      //   let catalogueName: string = paramMap.get('catalogue');
      //   let idCatalogue: number = this.getIdCatalogue(catalogueName);
      //   this.getAllCategoriesByCatalogue(idCatalogue, catalogueName);
      //   this.getAllProductsByCatalogue(idCatalogue);
      // }

      if(paramMap.has('catalogue') && !paramMap.has('idCategory')){
        let catalogueName: string = paramMap.get('catalogue');
        let idCatalogue: number = this.getIdCatalogue(catalogueName);
        this.getAllCategoriesByCatalogue(idCatalogue, catalogueName);
        this.getAllProductsByCatalogue(idCatalogue);
      }
      if(paramMap.has('catalogue') && paramMap.has('idCategory')){
        let idCategory: number = Number(paramMap.get('idCategory'));
        let catalogueName: string = paramMap.get('catalogue');
        let idCatalogue: number = this.getIdCatalogue(catalogueName);
        this.getAllCategoriesByCatalogue(idCatalogue, catalogueName);
	      this.getAllProductsByCatalogue(idCategory);
      }
    });
    this.getAllNewProducts();
    this.getAllTags();

    // TEST
    // this.sub = this.productService.findAllActives().subscribe(data => {
    //   this.products = data as Product[];
    //   this.isMainProductsLoaded = true;
    // });
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(el => el.unsubscribe());
  }

  private getIdCatalogue(catalogueName: string): number {
    switch(catalogueName) {
      case CataloguesEnum[CataloguesEnum.tortas]: {
        this.title = 'tortas';
        return CataloguesEnum.tortas;
      }
      case CataloguesEnum[CataloguesEnum.emporio]: {
        this.title = 'emporio';
        return CataloguesEnum.emporio;
      }
      case CataloguesEnum[CataloguesEnum.chocolateria]: {
        this.title = 'chocolateria';
        return CataloguesEnum.chocolateria;
      }
      default: {
        return null;
      }
    }
  }

  private getAllCategoriesByCatalogue(id: number, catalogueName: string){
    const findAllByCatalogue$: Subscription = this.categoryService.findAllByCatalogue(id).subscribe(data => {
      let categories: Category[] = data as Category[];
      this.store.dispatch({ type: CategoryActionTypes.Load });
      this.store.dispatch({ type: CategoryActionTypes.PartialUrl, payload: catalogueName });
      this.store.dispatch({ type: CategoryActionTypes.Read, payload: categories });
    });
    this.subscriptions$.push(findAllByCatalogue$);
  }

  private getAllProductsByCatalogue(id: number){
    const findAllProductsByCatalogue$: Subscription = this.productService.findAllActivesByCatalogue(id).subscribe(data => {
      this.products = data as Product[];
      this.isMainProductsLoaded = true;
    });
    this.subscriptions$.push(findAllProductsByCatalogue$);
  }

  private getAllProducts(){
    const findAllProducts$: Subscription = this.productService.findAllActives().subscribe(data => {
      this.products = data as Product[];
      this.isMainProductsLoaded = true;
    });
    this.subscriptions$.push(findAllProducts$);

    // MOCK
    // this.productMockService.findAllActives().subscribe(data => {
    //   this.products = data as Product[];
    //   this.isMainProductsLoaded = true;
    // });
  }

  private getAllNewProducts(){
    const findAllNewProducts$: Subscription = this.productService.findAllActivesNew().subscribe(data => {
      this.newProducts = data as Product[];
      this.isNewProductsLoaded = true;
    });
    this.subscriptions$.push(findAllNewProducts$);

    // MOCK
    // this.productMockService.findAllActives().subscribe(data => {
    //   this.newProducts = [];
    //   let allProducts: Product[] = data as Product[];
    //   allProducts.forEach(prod => {
    //     if(prod.isNew){
    //       this.newProducts.push(prod);
    //     }
    //   });
    //   this.isNewProductsLoaded = true;
    // });
  }

  private getAllTags(){
    const findAllTags$: Subscription = this.tagService.findAll().subscribe(data => {
      this.tags = data as Tag[];
      this.isTagsLoaded = true;
    });
    this.subscriptions$.push(findAllTags$);

    // MOCK
    // this.tagMockservice.findAll().subscribe(data => {
    //   this.tags = data as Tag[];
    //   this.isTagsLoaded = true;
    // });
  }

  private getAllProductByCategory(idCategory: number){
    const findAllActivesByCategory$: Subscription = this.productService.findAllActivesByCategory(idCategory).subscribe(data => {
      this.products = data as Product[];
      this.isMainProductsLoaded = true;
    });
    this.subscriptions$.push(findAllActivesByCategory$);

    // MOCK
    // this.productMockService.findAllActives().subscribe(data => {
    //   this.products = [];
    //   let allProducts: Product[] = data as Product[];
    //   allProducts.forEach(prod => {
    //     prod.categories.forEach(cat => {
    //       if(cat.idCategory == idCategory){
    //         this.products.push(prod);
    //       }
    //     })
    //   });
    //   this.isMainProductsLoaded = true;
    // });
  }


  // Append filter value to Url
  // updateFilter(tags: any) {
  //   tags.page = null; // Reset Pagination
  //   this.router.navigate([], { 
  //     relativeTo: this.route,
  //     queryParams: tags,
  //     queryParamsHandling: 'merge', // preserve the existing query params in the route
  //     skipLocationChange: false  // do trigger navigation
  //   }).finally(() => {
  //     this.viewScroller.setOffset([120, 120]);
  //     this.viewScroller.scrollToAnchor('products'); // Anchore Link
  //   });
  // }

  // SortBy Filter
  // sortByFilter(value) {
  //   this.router.navigate([], { 
  //     relativeTo: this.route,
  //     queryParams: { sortBy: value ? value : null},
  //     queryParamsHandling: 'merge', // preserve the existing query params in the route
  //     skipLocationChange: false  // do trigger navigation
  //   }).finally(() => {
  //     this.viewScroller.setOffset([120, 120]);
  //     this.viewScroller.scrollToAnchor('products'); // Anchore Link
  //   });
  // }

  // Remove Tag
  // removeTag(tag) {
  
  //   this.brands = this.brands.filter(val => val !== tag);
  //   this.colors = this.colors.filter(val => val !== tag);
  //   this.size = this.size.filter(val => val !== tag );

  //   let params = { 
  //     brand: this.brands.length ? this.brands.join(",") : null, 
  //     color: this.colors.length ? this.colors.join(",") : null, 
  //     size: this.size.length ? this.size.join(",") : null
  //   }

  //   this.router.navigate([], { 
  //     relativeTo: this.route,
  //     queryParams: params,
  //     queryParamsHandling: 'merge', // preserve the existing query params in the route
  //     skipLocationChange: false  // do trigger navigation
  //   }).finally(() => {
  //     this.viewScroller.setOffset([120, 120]);
  //     this.viewScroller.scrollToAnchor('products'); // Anchore Link
  //   });
  // }

  // Clear Tags
  // removeAllTags() {
  //   this.router.navigate([], { 
  //     relativeTo: this.route,
  //     queryParams: {},
  //     skipLocationChange: false  // do trigger navigation
  //   }).finally(() => {
  //     this.viewScroller.setOffset([120, 120]);
  //     this.viewScroller.scrollToAnchor('products'); // Anchore Link
  //   });
  // }

  // product Pagination
  // setPage(page: number) {
  //   this.router.navigate([], { 
  //     relativeTo: this.route,
  //     queryParams: { page: page },
  //     queryParamsHandling: 'merge', // preserve the existing query params in the route
  //     skipLocationChange: false  // do trigger navigation
  //   }).finally(() => {
  //     this.viewScroller.setOffset([120, 120]);
  //     this.viewScroller.scrollToAnchor('products'); // Anchore Link
  //   });
  // }

  // Change Grid Layout
  // updateGridLayout(value: string) {
  //   this.grid = value;
  // }

  // Change Layout View
  // updateLayoutView(value: string) {
  //   this.layoutView = value;
  //   if(value == 'list-view')
  //     this.grid = 'col-lg-12';
  //   else
  //     this.grid = 'col-xl-3 col-md-6';
  // }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
