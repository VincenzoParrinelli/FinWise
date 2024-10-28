import { createAction, props } from '@ngrx/store';
import {
  NewTransactionFormData,
  Transaction,
  TransactionsState,
} from './transactions.model';

export const getTransactionsWithTotalsSuccess = createAction(
  '[Transaction] Get Transactions With Totals Success',
  props<{ transactionsWithTotals: TransactionsState }>()
);

export const getTransactionsWithTotals = createAction(
  '[Transaction] Get Transactions',
  props<{ userId: string; page: number; pageSize: number }>()
);

export const createTransaction = createAction(
  '[Transaction] Create Transaction',
  props<{ transaction: NewTransactionFormData }>()
);

export const createTransactionSuccess = createAction(
  '[User] Create Transaction Success',
  props<{ transaction: Transaction }>()
);
