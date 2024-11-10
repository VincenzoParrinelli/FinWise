import { createAction, props } from '@ngrx/store';
import { NewUserFormData, UpdatedUserFormData, User } from './user.model';

export const createUser = createAction(
  '[User] Create User',
  props<{ user: NewUserFormData }>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: User }>()
);

export const loginUser = createAction(
  '[User] Login User',
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ updatedUserFormData: UpdatedUserFormData }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ updatedUserFormData: UpdatedUserFormData }>()
);

export const logoutUser = createAction('[User] Logout User');

export const logoutUserSuccess = createAction('[User] Logout User Success');
