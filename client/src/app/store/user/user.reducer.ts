import { createReducer, on } from '@ngrx/store';
import { User } from './user.model';
import * as UserActions from './user.actions';

export interface UserState {
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
}

export const initialState: UserState = {
  user: null,
  error: null,
  isAuthenticated: false,
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
    isAuthenticated: true,
  })),
  on(UserActions.loginUser, (state) => ({
    ...state,
    error: null,
  })),
  on(UserActions.loginUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null,
  }))
);
