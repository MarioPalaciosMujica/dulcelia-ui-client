import { Category } from '../../shared/models/category.model';
import { CategoryActions, CategoryActionTypes } from './../actions/category.actions';
import { AppState, initAppState } from './app.state';

export function categoryReducer(state: AppState = initAppState, action: CategoryActions){
    switch(action.type){

        case CategoryActionTypes.Read: {
            const categoryList: Category[] = action.payload;
            return Object.assign({}, state, {
                categories: categoryList,
                loading: false,
                loaded: true
            });
        }

        case CategoryActionTypes.Load: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }

        default: {
            return state;
        }

    }
}