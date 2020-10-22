import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

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
        return this.http.post(this.endpoint + '/login', resource)
            .map(response => response)
            .catch(this.handleError);
    }

    register(resource: any) {
        return this.http.post(this.endpoint + '/register', resource)
            .map(response => response)
            .catch(this.handleError);
    }

    isUniqueEmail(resource: any) {
        return this.http.post(this.endpoint + '/isUniqueEmail', resource)
            .map(response => response)
            .catch(this.handleError);
    }

    // getSystemPermission(systemPermission: SystemPermission): any {
    //     switch(systemPermission){
    //         case SystemPermission.Checkout:
    //             return { module: "Checkout" }
    //         default:
    //             return null;
    //     }
    // }
}