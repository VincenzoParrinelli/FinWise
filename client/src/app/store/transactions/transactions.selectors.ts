import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './transactions.model';

export const selectTransactionsState =
  createFeatureSelector<TransactionsState>('transactions');

export const selectTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.transactions
);

export const selectRandomGroupedTransaction = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.randomGroupedTransaction
);

export const selectFilteredByDateTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.filteredByDateTransactions
);

export const selectSearchedTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.searchedTransactions
);

export const selectDailyTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.dailyTransactions
);

export const selectWeeklyTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.weeklyTransactions
);

export const selectMonthlyTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.monthlyTransactions
);

export const selectYearlyTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.yearlyTransactions
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

export const selectTotalSearchedTransactionsInDb = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.totalSearchedTransactionsInDb
);
