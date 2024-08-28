import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IAppState } from "..";

export const getAppState =
  createFeatureSelector<IAppState>('app-state');

export const selectMe = createSelector(
  getAppState,
  (state) => state.usersState.me,
);
  