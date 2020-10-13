import { ModuleModel } from './module.model';

export interface PermissionModel {
    idPermission?: number;
    isCreateAllowed?: boolean;
    isRetrieveAllowed?: boolean;
    isUpdateAllowed?: boolean;
    isDeleteAllowed?: boolean;
    module?: ModuleModel;
}