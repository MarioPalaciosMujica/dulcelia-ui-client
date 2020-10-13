import { PermissionModel } from "./permission.model";

export interface RoleModel {
    idRole?: number;
    isActive?: boolean;
    created?: string;
    modified?: string;
    permissions?: PermissionModel[];
}