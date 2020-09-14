import { CollectionMockService } from './../../../core/mocks/collection-mock.service';
import { ProductMockService } from './../../../core/mocks/product-mock.service';
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

    //public themeLogo: string = 'assets/images/icon/logo-11.png'; // Change Logo

    public products: Product[];
    public collections: Collection[];

    constructor(
        private productService: ProductService,
        private collectionService: CollectionService,
        private productMockService: ProductMockService,
        private collectionMockService: CollectionMockService
    ){
        this.products = [];
        this.collections = [];
    }

    ngOnInit() {
        // Change color for this layout
        //document.documentElement.style.setProperty('--theme-deafult', '#fa869b');

        this.getAllProducts();
        this.getAllCollections();
    }

    ngOnDestroy(): void {
        // Remove Color
        //document.documentElement.style.removeProperty('--theme-deafult');
    }

    private getAllProducts(){
        // this.productService.findAllActives().subscribe(data => {
        //     this.products = data as Product[];
        // });
        
        //MOCK
        this.productMockService.findAllActives().subscribe(data => {
            this.products = data as Product[];
        });
    }

    private getAllCollections(){
        // this.collectionService.findAll().subscribe(data => {
        //     this.collections = data as Collection[];
        // });
        
        //MOCK
        this.collectionMockService.findAll().subscribe(data => {
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

    public sliders = [
        {
          title: 'Cumpleañeros(as) mayores de 60 años',
          subTitle: '10% de descuento en tortas',
          image: 'assets/dulcelia-demo/pages/portada.jpg'
        }
        // ,{
        //   title: 'Compras sobre $30.00 en Emporio',
        //   subTitle: 'Envio Gratis',
        //   image: 'assets/dulcelia-demo/slider-bike.jpg'
        // }
    ];
    
    public blogs = [{
        image: 'assets/dulcelia-demo/blog/blog_02_1000x591.jpg',
        date: '25 Enero 2018',
        title: 'En Mucho Gusto',
        by: 'Beatriz Canales'
    }, {
        image: 'assets/dulcelia-demo/blog/blog_03_1000x591.jpg',
        date: '7 Junio 2015',
        title: 'Una Visita Sorpresa',
        by: 'Beatriz Canales'
    }, {
        image: 'assets/dulcelia-demo/blog/blog_05_1000x591.jpg',
        date: '15 Agosto 2009',
        title: 'Reportaje Pyme Mujer',
        by: 'Beatriz Canales'
    }];

}