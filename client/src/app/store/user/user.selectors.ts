import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.model';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectIsUserAuthenticated = createSelector(
  selectUserState,
  (state: UserState) => state.isAuthenticated
);

export const selectUserId = createSelector(
  selectUserState,
  (state: UserState) => state.user?._id
);

export const selectUserName = createSelector(
  selectUserState,
  (state: UserState) => state.user?.fullName
);
