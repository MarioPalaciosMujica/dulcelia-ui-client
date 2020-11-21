import { Action } from '@ngrx/store';
import { Category } from './../../shared/models/category.model';

export enum CategoryActionTypes {
    Read = "[Read] Action",
    PartialUrl = "[PartialUrl] Action",
    Load = '[Load] Action'   
}

export class Read implements Action {
    readonly type = CategoryActionTypes.Read;
    constructor(public payload: Category[]){}
}

export class PartialUrl implements Action {
    readonly type = CategoryActionTypes.PartialUrl;
    constructor(public payload: string){}
}

export class Load implements Action {
    readonly type = CategoryActionTypes.Load;
}


export type CategoryActions = Read | PartialUrl | Load ;