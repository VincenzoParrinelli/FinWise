import { createReducer, on } from '@ngrx/store';
import { TransactionsState } from './transactions.model';
import * as TransactionsActions from './transactions.actions';

export const initialState: TransactionsState = {
  transactions: [],
};

export const transactionsReducer = createReducer(
  initialState,

  on(TransactionsActions.getTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
  })),
  on(TransactionsActions.createTransaction, (state) => ({
    ...state,
  })),
  on(
    TransactionsActions.createTransactionSuccess,
    (state, { transaction }) => ({
      ...state,
      transactions: [...state.transactions, transaction],
    })
  )
);
