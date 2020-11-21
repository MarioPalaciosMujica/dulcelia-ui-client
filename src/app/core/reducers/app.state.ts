import { AuthModel } from '../../shared/models/auth.model';
import { Category } from '../../shared/models/category.model';

export interface AppState {
    authModel?: AuthModel;
    categories?: Category[];
    catalogue?: string;
    loading?: boolean;
    loaded?: boolean;
}

export const initAppState: AppState = {
    authModel: {
        loggedIn: false,
        clientName: 'Invitado',
        token: undefined,
        role: undefined
    },
    categories: [],
    catalogue: 'tortas',
    loading: false,
    loaded: false
}