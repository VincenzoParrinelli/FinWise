import { createAction, props } from '@ngrx/store';
import {
  NewSavingFormData,
  Saving,
  SavingsState,
  UpdatedSavingFormData,
} from './savings.model';

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

export const updateSaving = createAction(
  '[Saving] Update Saving',
  props<{
    updatedSavingFormData: UpdatedSavingFormData;
    id: string;
  }>()
);

export const updateSavingSuccess = createAction(
  '[Saving] Update Saving Success',
  props<{
    updatedSavingFormData: UpdatedSavingFormData;
    id: string;
  }>()
);

export const deleteSaving = createAction(
  '[Saving] Delete Saving',
  props<{ savingId: string }>()
);

export const deleteSavingSuccess = createAction(
  '[Saving] Delete Saving Success',
  props<{ savingId: string }>()
);
