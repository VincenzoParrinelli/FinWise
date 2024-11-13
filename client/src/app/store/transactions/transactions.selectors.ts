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
    binarySearchTransactions(state.transactions, _id)
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

const binarySearchTransactions = (
  arr: Transaction[],
  target: string
): Transaction | null => {
  if (!arr.length) return null;

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid]._id === target) {
      return arr[mid];
    } else if (arr[mid]._id! < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
};
