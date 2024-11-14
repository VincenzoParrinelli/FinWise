import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Transaction, TransactionsState } from './transactions.model';

export const selectTransactionsState =
  createFeatureSelector<TransactionsState>('transactions');

export const selectTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.transactions
);

export const selectTransaction = (_id: string) =>
  createSelector(selectTransactionsState, (state: TransactionsState) =>
    state.transactions.find((transaction) => transaction._id === _id)
  );

export const selectTransactionsTotals = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => {
    return {
      totalBalance: state.totalBalance,
      totalExpenses: state.totalExpenses,
      totalIncome: state.totalIncome,
    };
  }
);

export const selectTransactionsTotalUserDocuments = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.totalDocuments
);
