import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponService extends BaseService {

  constructor(http: HttpClient) {
    super(environment.apiOrderCoupon, http);
  }

  findActiveByCode(code: string){
    // return this.http.get(this.endpoint + '/findActiveByCode/' + code)
    //   .map(response => response)
    //   .catch(this.handleError);
    return this.http.get(this.endpoint + '/findActiveByCode/' + code).pipe(
      map((data: any) => {
        return data;
      })
    ); //.catch(this.handleError);
  }

}
