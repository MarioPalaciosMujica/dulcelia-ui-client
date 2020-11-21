import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService extends BaseService {

  constructor(http: HttpClient) { 
    super(environment.apiProductCollection, http);
  }

  // MOCK
  // private _dataFile: string = "assets/data/collections-mock.json";
  // public findAll(): Observable<any> {
  //   return this.http.get(this._dataFile);
  // }

  
}
