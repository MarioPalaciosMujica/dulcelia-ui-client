import { AuthActionTypes } from './../actions/auth.actions';
import { RoleModel } from '../../shared/models/role.model';

export interface IAuthState {
    loggedIn: boolean;
    isUserLoaded: boolean;
    authToken: string;
    role: RoleModel;
}

export const initAuthState: IAuthState = {
    loggedIn: false,
    isUserLoaded: false,
    authToken: 'init Token',
    role: undefined
}

export function rootReducer(state: IAuthState, action): IAuthState {
    console.log("authReducer");
    switch(action.type){
        case AuthActionTypes.Login:
            console.log("Login");
            return Object.assign({}, state, { 
                loggedIn: true, 
                isUserLoaded: true, 
                authToken: 'login_user_token', 
                role: {
                    permissions: [
                        { module: { moduleName: 'Checkout' }},
                        { module: { moduleName: 'CustomerDashBoard' }},
                    ]
                }
            });
        case AuthActionTypes.Logout:
            console.log("Logout");
            return Object.assign({}, state, { 
                loggedIn: true, 
                isUserLoaded: true, 
                authToken: 'login_user_token', 
                role: null
            });
        case AuthActionTypes.Register:
            console.log("Register");
            return Object.assign({}, state, { 
                loggedIn: true, 
                isUserLoaded: true, 
                authToken: 'register_user_token', 
                role: {
                    permissions: [
                        { module: { moduleName: 'Checkout' }},
                        { module: { moduleName: 'CustomerDashBoard' }},
                    ]
                }
            });
        default:
            return state;
    };
}