import { RoleModel } from './role.model';

export interface AuthModel {
    loggedIn?: boolean;
    clientName?: string;
    token?: string;
    role?: RoleModel;
}