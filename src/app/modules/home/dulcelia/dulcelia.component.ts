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

    public groupProductsByCollections(): Collection[] {
        for(let collection of this.collections){
            for(let product of this.products){
                if(product.collection.idCollection == collection.idCollection){
                    collection.products.push(product);
                }
            }
        }
        return this.collections;
    }

    public getCollectionProducts(collection: Collection): Product[]{
        console.log();
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
      image: 'assets/images/slider/13.jpg'
    }, {
      title: 'save upto 10%',
      subTitle: 'pre-made & custom',
      image: 'assets/images/slider/14.jpg'
    }];
    
    public blogs = [{
        image: 'assets/images/blog/17.jpg',
        date: '25 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }, {
        image: 'assets/images/blog/18.jpg',
        date: '26 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }, {
        image: 'assets/images/blog/19.jpg',
        date: '27 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }, {
        image: 'assets/images/blog/17.jpg',
        date: '28 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }];

}