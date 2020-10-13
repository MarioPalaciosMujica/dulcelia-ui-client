import { RoleModel } from './role.model';

export interface AuthModel {
    clientName?: string;
    token?: string;
    role?: RoleModel;
}