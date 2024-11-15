import { createAction, props } from '@ngrx/store';
import {
  NewTransactionFormData,
  Transaction,
  TransactionsState,
  UpdatedTransactionFormData,
} from './transactions.model';

export const getTransactionsWithTotalsSuccess = createAction(
  '[Transaction] Get Transactions With Totals Success',
  props<{ transactionsWithTotals: TransactionsState }>()
);

export const getTransactionsWithTotals = createAction(
  '[Transaction] Get Transactions',
  props<{ page: number; pageSize: number }>()
);

export const createTransaction = createAction(
  '[Transaction] Create Transaction',
  props<{ transaction: NewTransactionFormData }>()
);

export const createTransactionSuccess = createAction(
  '[Transaction] Create Transaction Success',
  props<{ transaction: Transaction }>()
);

export const updateTransaction = createAction(
  '[Transaction] Update Transaction',
  props<{
    updatedTransactionFormData: UpdatedTransactionFormData;
    id: string;
  }>()
);

export const updateTransactionSuccess = createAction(
  '[Transaction] Update Transaction Success',
  props<{
    updatedTransactionFormData: UpdatedTransactionFormData;
    id: string;
  }>()
);

export const deleteTransaction = createAction(
  '[Transaction] Delete Transaction',
  props<{ transactionId: string }>()
);

export const deleteTransactionSuccess = createAction(
  '[Transaction] Delete Transaction Success',
  props<{ transactionId: string }>()
);
