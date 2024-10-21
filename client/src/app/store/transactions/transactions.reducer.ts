import { createReducer, on } from '@ngrx/store';
import { TransactionsState } from './transactions.model';
import * as TransactionsActions from './transactions.actions';

export const initialState: TransactionsState = {
  transactions: [],
};

export const TransactionsReducer = createReducer(
  initialState,
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
