import { createAction, props } from '@ngrx/store';
import { NewSavingFormData, Saving } from './savings.model';

export const createSaving = createAction(
  '[Saving] Create Saving',
  props<{ saving: NewSavingFormData }>()
);

export const createSavingSuccess = createAction(
  '[Saving] Create Saving Success',
  props<{ saving: Saving }>()
);
