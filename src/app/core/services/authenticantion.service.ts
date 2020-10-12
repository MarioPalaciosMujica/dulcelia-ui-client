import { AuthActionTypes } from './../actions/auth.actions';
import { NgRedux } from '@angular-redux/store';
import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { SystemPermission } from './../../shared/models/system-permission.enum';
import { IAuthState } from '../reducers/auth.reducers';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends BaseService {
    
    constructor(
        http: HttpClient,
        private authState: NgRedux<IAuthState>
    ) {
        super(environment.apiProductBrand, http);
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

    getAuthData(): any{
        this.authState.subscribe( () => {
            return this.authState.getState();
        });
        // return {
        //     role: {
        //         permissions: [
        //             {
        //                 module: {
        //                     moduleName: 'Checkout'
        //                 }
        //             }
        //         ]
        //     }
        // }; 
    }

    logout(){
        this.authState.dispatch({type: AuthActionTypes.Logout});
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