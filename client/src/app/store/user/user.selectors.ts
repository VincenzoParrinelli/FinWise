import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectIsUserAuthenticated = createSelector(
  selectUserState,
  (state: UserState) => state.isAuthenticated
);
