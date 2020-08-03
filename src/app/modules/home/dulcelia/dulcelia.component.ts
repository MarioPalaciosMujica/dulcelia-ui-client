import { CollectionService } from '../../../core/services/collection.service';
import { ProductService } from '../../../core/services/product.service';
import { Collection } from '../../../shared/models/collection.model';
import { Product } from '../../../shared/models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductSlider } from './../../../shared/data/slider';

@Component({
    selector: 'app-flower',
    templateUrl: './dulcelia.component.html',
    styleUrls: ['./dulcelia.component.scss']
})
export class DulceliaComponent implements OnInit, OnDestroy {

    public themeLogo: string = 'assets/images/icon/logo-11.png'; // Change Logo

    public products: Product[];
    public collections: Collection[];

    constructor(
        private productService: ProductService,
        private collectionService: CollectionService
    ){
        this.products = [];
        this.collections = [];
    }

    ngOnInit() {
        // Change color for this layout
        document.documentElement.style.setProperty('--theme-deafult', '#fa869b');

        this.getAllProducts();
        this.getAllCollections();
    }

    ngOnDestroy(): void {
        // Remove Color
        document.documentElement.style.removeProperty('--theme-deafult');
    }

    private getAllProducts(){
        this.productService.findAllActives().subscribe(data => {
            this.products = data as Product[];
        });
    }

    private getAllCollections(){
        this.collectionService.findAll().subscribe(data => {
            this.collections = data as Collection[];
        });
    }

    public getCollectionProducts(collection: Collection): Product[]{
        let productList: Product[] = [];
        for(let product of this.products){
            if(product.collection.idCollection == collection.idCollection){
                productList.push(product);
            }
        }
        return productList;
    }

    // METADATA

    public ProductSliderConfig: any = ProductSlider;

    public sliders = [{
      title: 'save upto 20%',
      subTitle: 'creative & decor',
      image: 'assets/dulcelia-demo/slider-flowers.jpg'
    }, {
      title: 'save upto 10%',
      subTitle: 'pre-made & custom',
      image: 'assets/dulcelia-demo/slider-bike.jpg'
    }];
    
    public blogs = [{
        image: 'assets/dulcelia-demo/blog-1.jpg',
        date: '25 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }, {
        image: 'assets/dulcelia-demo/blog-2.jpg',
        date: '26 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }, {
        image: 'assets/dulcelia-demo/blog-3.jpg',
        date: '27 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }];

}