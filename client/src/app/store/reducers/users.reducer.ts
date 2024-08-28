import { Action, createReducer, on } from '@ngrx/store';
import { getMe, getMeFailure, getMeSuccess } from '../actions/users.action';

import { User } from '@shared/interfaces';

export interface UsersState {
  me: User | null;
}

export const initialUsersState: UsersState = {
  me: null,
};

const usersReducer = createReducer(
  initialUsersState,
  on(getMe, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getMeSuccess, (state, { me }) => {
    return {
      ...state,
      me: { ...me },
      isLoading: false,
    };
  }),
  on(getMeFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
);

export function UsersReducer(
  state: UsersState | undefined,
  action: Action,
): UsersState {
  return usersReducer(state, action);
}
