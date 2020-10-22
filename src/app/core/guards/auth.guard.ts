import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private store: Store<any>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.store.map(state => {
            let authStateModel: any = state.authReducer.authModel;
            if(state.authReducer.loaded){
                for(let permission of authStateModel.role.permissions){
                    if(permission.module.moduleCode == route.data.module[0]){
                        return true;
                    }
                }
                this.router.navigate(['/pagina/login']);
                return false;
            }
            else {
                this.router.navigate(['/pagina/login']);
                return false;
            }
        });
    }
}