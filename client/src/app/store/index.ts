import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UsersReducer, UsersState } from './reducers/users.reducer';

export interface IAppState {
  usersState: UsersState;
}

export const reducers: ActionReducerMap<IAppState> = {
  usersState: UsersReducer,
};
