import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './transactions.model';

export const selectTransactionsState =
  createFeatureSelector<TransactionsState>('transactions');

export const selectTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.transactions
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
