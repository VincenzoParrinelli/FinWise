import { createReducer, on } from '@ngrx/store';
import { TransactionsState } from './transactions.model';
import * as TransactionsActions from './transactions.actions';

export const initialState: TransactionsState = {
  totalBalance: 0,
  totalIncome: 0,
  totalExpenses: 0,
  transactions: [],
};

export const transactionsReducer = createReducer(
  initialState,

  on(
    TransactionsActions.getTransactionsWithTotalsSuccess,
    (_state, { transactionsWithTotals }) => transactionsWithTotals
  ),
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
