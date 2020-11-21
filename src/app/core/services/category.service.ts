import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(http: HttpClient) {
    super(environment.apiProductCategory, http);
  }

  findAllByCatalogue(idCatalogue: number){
    return this.http.get(this.endpoint + '/findAllByCatalogue/' + idCatalogue).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // MOCK
  // private _dataFile: string = "assets/data/categories-mock.json";
  // public findAll(): Observable<any> {
  //   return this.http.get(this._dataFile);
  // }


}
