import { UserContactModel } from './user-contact.model';
import { RoleModel } from './role.model';

export interface UserAccountModel {
    idUserAccount?: string;
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    created?: string;
    modified?: string;
    role?: RoleModel;
    userContact?: UserContactModel;
}