import { createReducer, on } from '@ngrx/store';
import { User } from './user.model';
import * as UserActions from './user.actions';

export interface UserState {
  user: User | null;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.createUser, (state) => ({
    ...state,
    error: null,
  })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  }))
);
