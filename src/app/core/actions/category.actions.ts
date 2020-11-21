import { Action } from '@ngrx/store';
import { Category } from './../../shared/models/category.model';

export enum CategoryActionTypes {
    Read = "[Read] Action",
    Load = '[Load] Action'   
}

export class Read implements Action {
    readonly type = CategoryActionTypes.Read;
    constructor(public payload: Category[]){}
}

export class Load implements Action {
    readonly type = CategoryActionTypes.Load;
}


export type CategoryActions = Read | Load ;