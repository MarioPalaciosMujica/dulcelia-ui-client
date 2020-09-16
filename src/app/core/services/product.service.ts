import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from './../../shared/models/product.model';

const state = {
  products: JSON.parse(localStorage['products'] || '[]'),
  wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['compareItems'] || '[]'),
  cart: JSON.parse(localStorage['cartItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  public OpenCart: boolean = false;
  // public Products

  constructor(
    http: HttpClient,
    private toastrService: ToastrService
  ) 
  { 
    super(environment.apiProductProduct, http);
  }

  findAllActives(){
    return this.http.get(this.endpoint + '/findAllActives')
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesByTag(idTag: number){
    return this.http.get(this.endpoint + '/findAllActivesByTag/' + idTag)
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesByTags(resource: any[]){
    return this.http.post(this.endpoint + '/findAllActivesByTags/', resource)
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesNew(){
    return this.http.get(this.endpoint + '/findAllActivesNew')
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesOnSale(){
    return this.http.get(this.endpoint + '/findAllActivesOnSale')
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesByCollection(idCollection: number){
    return this.http.get(this.endpoint + '/findAllActivesByCollection/' + idCollection)
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesInStock(){
    return this.http.get(this.endpoint + '/findAllActivesInStock')
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesByCategory(idCategory: number){
    return this.http.get(this.endpoint + '/findAllActivesByCategory/' + idCategory)
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesByBrand(idBrand: number){
    return this.http.get(this.endpoint + '/findAllActivesByBrand/' + idBrand)
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesByTitle(partialTitle: string){
    return this.http.get(this.endpoint + '/findAllActivesByTitle/' + partialTitle)
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesByPriceRange(minPrice: number, maxPrice: number){
    return this.http.get(this.endpoint + '/findAllActivesByPriceRange/' + minPrice + '/' + maxPrice)
      .map(response => response)
      .catch(this.handleError)
  }

  updateRanking(idProduct: number){
    return this.http.get(this.endpoint + '/updateRanking/' + idProduct)
      .map(response => response)
      .catch(this.handleError)
  }

  // ---------------- TOOLS ---------------- 

  // Select Variant
  public changeVariant(product: Product, idVariant: number): Product{
    for(let variant of product.variants){
      if(variant.idVariant == idVariant){
        variant.isSelected = true;
        product.currentBasePrice = variant.basePriceAmount;
        product.currentTotalPrice = variant.totalPriceAmount;
      }
      else {
        variant.isSelected = false;
      }
    }
    return product;
  }

  // Get Selected Variant
  public getSelectedVariant(product: Product): any{
    return product.variants.find(v=> v.isSelected);
  }

  // WISH LIST:
  // Get Wishlist Items
  public get wishlistItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.wishlist);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Wishlist
  public addToWishlist(product: Product): any {
    const wishlistItem = state.wishlist.find(item => item.idProduct === product.idProduct)
    if (!wishlistItem) {
      state.wishlist.push({
        ...product
      })
    }
    // this.toastrService.success('Product has been added in wishlist.');
    this.toastrService.success('El producto añadido a su lista de desados');
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // Remove Wishlist items
  public removeWishlistItem(product: Product): any {
    const index = state.wishlist.indexOf(product);
    state.wishlist.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // ---------------------------------------

  // COMPARE PRODUCTS:
  // Get Compare Items
  public get compareItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.compare);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Compare
  public addToCompare(product: Product): any {
    const compareItem = state.compare.find(
      item => item.idProduct === product.idProduct &&
      this.getSelectedVariant(item).idVariant === this.getSelectedVariant(product).idVariant
    );
    if (!compareItem) {
      state.compare.push({
        ...product
      })
    }
    // this.toastrService.success('Product has been added in compare.');
    this.toastrService.success('El producto añadido a su lista de comparación');
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  // Remove Compare items
  public removeCompareItem(product: Product): any {
    const index = state.compare.indexOf(product);
    state.compare.splice(index, 1);
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  // ---------------------------------------

  // CART:
  // Get Cart Items
  public get cartItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.cart);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  
  
  // Add to Cart
  public addToCart(product: Product): any {
    //const cartItem = state.cart.find(item => item.idProduct === product.idProduct && item.currentTotalPrice === product.currentTotalPrice);

    const cartItem = state.cart.find(
      item => item.idProduct === product.idProduct &&
      this.getSelectedVariant(item).idVariant === this.getSelectedVariant(product).idVariant
    );

    const qty = product.quantity ? product.quantity : 1;
    const items = cartItem ? cartItem : product;
    const stock = this.calculateStockCounts(items, qty);
    
    if(!stock) return false

    if (cartItem) {
        cartItem.quantity += qty    
    } else {
      state.cart.push({
        ...product,
        quantity: qty
      })
    }

    this.OpenCart = true; // If we use cart variation modal
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    this.toastrService.success('El producto fue añadido a su carro');
    return true;
  }

  // Update Cart Quantity
  public updateCartQuantity(product: Product, quantity: number): Product | boolean {
    return state.cart.find((items, index) => {
      if (items.idProduct === product.idProduct && this.getSelectedVariant(items).idVariant === this.getSelectedVariant(product).idVariant) {
        const qty = state.cart[index].quantity + quantity
        const stock = this.calculateStockCounts(state.cart[index], quantity)
        if (qty !== 0 && stock) {
          state.cart[index].quantity = qty
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        return true
      }
    })
  }

  // Calculate Stock Counts
  public calculateStockCounts(product: Product, quantity: number) {
    const qty = product.quantity + quantity
    const stock = product.stock
    if (stock != null && (stock < qty || stock == 0)) {
      // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
      this.toastrService.error('No puede añadir mas productos a los que estan Stock. Productos '+ stock +' en stock.');
      return false
    }
    return true
  }

  // Remove Cart items
  public removeCartItem(product: Product): any {
    const index = state.cart.indexOf(product);
    state.cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true
  }

  // Total amount 
  public cartTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((product: Product[]) => {
      return product.reduce((prev, curr: Product) => {

        // old
        // let price = curr.price;
        // if(curr.discount) {
        //   price = curr.price - (curr.price * curr.discount / 100)
        // }
        // return (prev + price * curr.quantity) * this.Currency.price;

        // new
        let price: number;
        if(curr.isSale){
          price = curr.currentTotalPrice;
        } 
        else {
          price = curr.currentBasePrice;
        }
        return (prev + price * curr.quantity);

      }, 0);
    }));
  }

  // ---------------------------------------

}