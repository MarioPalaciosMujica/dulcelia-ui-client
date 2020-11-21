import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseService {

  constructor(http: HttpClient) {
    super(environment.apiProductTag, http);
  }

  // MOCK
  // private _dataFile: string = "assets/data/tags-mock.json";
  // public findAll(): Observable<any> {
  //   return this.http.get(this._dataFile);
  // }
}
