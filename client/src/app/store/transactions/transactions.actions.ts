import { createAction, props } from '@ngrx/store';
import { NewTransactionFormData, Transaction } from './transactions.model';

export const createTransaction = createAction(
  '[Transaction] Create Transaction',
  props<{ transaction: NewTransactionFormData }>()
);

export const createTransactionSuccess = createAction(
  '[User] Create Transaction Success',
  props<{ transaction: Transaction }>()
);
