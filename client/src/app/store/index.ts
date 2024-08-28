import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { SettingsReducer, SettingsState } from './reducers/settings.reducer';
import { UsersReducer, UsersState } from './reducers/users.reducer';

export interface IAppState {
  usersState: UsersState;
  settingState: SettingsState;
}

export const reducers: ActionReducerMap<IAppState> = {
  usersState: UsersReducer,
  settingState: SettingsReducer,
};
