import { AuthModel } from './../../shared/models/auth.model';
import { AuthActionTypes, AuthActions } from './../actions/auth.actions';
import { RoleModel } from './../../shared/models/role.model';

export interface AuthState {
    authModel?: AuthModel;
    loading?: boolean;
    loaded?: boolean;
}

export const initAuthState: AuthState = {
    authModel: {
        loggedIn: false,
        clientName: 'Invitado',
        token: undefined,
        role: undefined
    },
    loading: false,
    loaded: false
}

export function authReducer(state: AuthState = initAuthState, action: AuthActions) {
    switch(action.type){

        case AuthActionTypes.Login: {
            console.log("Login");
            const authModel: AuthModel = action.payload;
            return Object.assign({}, state, {
                authModel: {
                    loggedIn: true,
                    clientName: authModel.clientName,
                    token: authModel.token,
                    role: authModel.role
                },
                loading: false,
                loaded: true
            });
        }

        case AuthActionTypes.Logout: {
            return initAuthState;
        }

        case AuthActionTypes.Register: {
            console.log("Register");
            const authModel: AuthModel = action.payload;
            return Object.assign({}, state, {
                authModel: {
                    loggedIn: true,
                    clientName: authModel.clientName,
                    token: authModel.token,
                    role: authModel.role
                },
                loading: false,
                loaded: true
            });
        }

        case AuthActionTypes.Load: {
            console.log("Load");
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }

        default: {
            return state;
        }

    };
}