import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './../services/authenticantion.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.getAuthData();
        if (user) {
            // // check if route is restricted by role
            // if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
            //     // role not authorised so redirect to home page
            //     this.router.navigate(['/']);
            //     return false;
            // }
            // // authorised so return true
            // return true;

            console.log(user);
            console.log(route.data.module[0]);

            for(let permission of user.role.permissions){
                if(permission.module.moduleName == route.data.module[0]){
                    return true;
                }
            }
            this.router.navigate(['/pagina/login']);
            return false;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/pagina/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}