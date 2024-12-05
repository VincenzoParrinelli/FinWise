import { createAction, props } from '@ngrx/store';
import {
  NewTransactionFormData,
  Transaction,
  TransactionsState,
  UpdatedTransactionFormData,
} from './transactions.model';

export const getTransactionsWithTotals = createAction(
  '[Transaction] Get Transactions With Totals',
  props<{ page: number; pageSize: number; savingId?: string }>()
);

export const getTransactionsWithTotalsSuccess = createAction(
  '[Transaction] Get Transactions With Totals Success',
  props<{ transactionsWithTotals: TransactionsState; savingId?: string }>()
);

export const getGroupedTransactions = createAction(
  '[Transaction] Get Grouped Transactions',
  props<{ group: string }>()
);

export const getGroupedTransactionsSuccess = createAction(
  '[Transaction] Get Grouped Transactions Success',
  props<{ groupedTransactions: []; group: string }>()
);

export const createTransaction = createAction(
  '[Transaction] Create Transaction',
  props<{ transaction: NewTransactionFormData; savingId?: string }>()
);

export const createTransactionSuccess = createAction(
  '[Transaction] Create Transaction Success',
  props<{ transaction: Transaction }>()
);

export const createSavingTransactionSuccess = createAction(
  '[Transaction] Create Saving Transaction Success',
  props<{ transaction: Transaction; savingId: string }>()
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
