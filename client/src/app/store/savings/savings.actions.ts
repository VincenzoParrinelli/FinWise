import { createAction, props } from '@ngrx/store';
import { NewSavingFormData, Saving, SavingsState } from './savings.model';

export const getSavings = createAction(
  '[Saving] Get Savings',
  props<{ page: number; pageSize: number }>()
);

export const getSavingsSuccess = createAction(
  '[Saving] Get Savings Success',
  props<{ savingsWithTotals: SavingsState }>()
);

export const createSaving = createAction(
  '[Saving] Create Saving',
  props<{ saving: NewSavingFormData }>()
);

export const createSavingSuccess = createAction(
  '[Saving] Create Saving Success',
  props<{ saving: Saving }>()
);
