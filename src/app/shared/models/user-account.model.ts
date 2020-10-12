import { RoleModel } from './role.model';

export interface UserAccountModel {
    token?: string;
    role?: RoleModel;
}