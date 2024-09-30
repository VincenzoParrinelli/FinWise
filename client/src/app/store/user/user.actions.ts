import { createAction, props } from '@ngrx/store';
import { NewUserFormData, User } from './user.model';

export const createUser = createAction(
  '[User] Create User',
  props<{ user: NewUserFormData }>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: User }>()
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: string }>()
);
