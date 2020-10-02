import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebpayService extends BaseService {

    constructor(http: HttpClient) {
        super(environment.apiWebpayClient, http);
    }

    initTransaction(resource: any){
        return this.http.post(this.endpoint + '/initTransaction', resource)
            .map(response => response)
            .catch(this.handleError)
    }
}