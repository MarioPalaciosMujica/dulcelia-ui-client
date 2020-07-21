import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(http: HttpClient) { 
    super(environment.apiProductProduct, http);
  }

  findAllActives(){
    return this.http.get(this.endpoint + 'findAllActives')
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesByTag(idTag: number){
    return this.http.get(this.endpoint + '/findAllActivesByTag/' + idTag)
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesNew(){
    return this.http.get(this.endpoint + 'findAllActivesNew')
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesOnSale(){
    return this.http.get(this.endpoint + 'findAllActivesOnSale')
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesByCollection(idCollection: number){
    return this.http.get(this.endpoint + '/findAllActivesByCollection/' + idCollection)
      .map(response => response)
      .catch(this.handleError)
  }

  findAllActivesInStock(){
    return this.http.get(this.endpoint + 'findAllActivesInStock')
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

}