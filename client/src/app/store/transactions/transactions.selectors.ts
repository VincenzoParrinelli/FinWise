import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './transactions.model';

export const selectTransactionsState =
  createFeatureSelector<TransactionsState>('transactions');

export const selectTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.transactions
);

export const selectSavingsTransactions = (savingId: string) =>
  createSelector(selectTransactionsState, (state: TransactionsState) => {
    return state.savingsTransactions.filter(
      (savingsTransaction) => savingsTransaction.savingId === savingId
    );
  });

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

export const selectTransactionsTotalDocuments = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.totalTransactionsInDb
);

export const selectTotalSavingsTransactionsInDb = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.totalSavingsTransactionsInDb
);
