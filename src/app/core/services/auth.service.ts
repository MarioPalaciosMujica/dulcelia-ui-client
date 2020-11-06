import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {

    constructor(
        http: HttpClient,
    ) {
        super(environment.apiAuthUserAccount, http);
    }

    login(resource: any) {
        // return this.http.post(this.endpoint + '/login', resource)
        //     .map(response => response)
        //     .catch(this.handleError);
        return this.http.post(this.endpoint + '/login', resource).pipe(
            map((data: any) => {
              return data;
            })
        ); //.catch(this.handleError);
    }

    register(resource: any) {
        // return this.http.post(this.endpoint + '/register', resource)
        //     .map(response => response)
        //     .catch(this.handleError);
        return this.http.post(this.endpoint + '/register', resource).pipe(
            map((data: any) => {
              return data;
            })
        ); //.catch(this.handleError)
    }

    isUniqueEmail(resource: any) {
        // return this.http.post(this.endpoint + '/isUniqueEmail', resource)
        //     .map(response => response)
        //     .catch(this.handleError);
        return this.http.post(this.endpoint + '/isUniqueEmail', resource).pipe(
            map((data: any) => {
              return data;
            })
        ); //.catch(this.handleError)
    }
}