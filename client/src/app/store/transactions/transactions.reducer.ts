import { createReducer, on } from '@ngrx/store';
import { Transaction, TransactionsState } from './transactions.model';
import * as TransactionsActions from './transactions.actions';

export const initialTransactionsState: TransactionsState = {
  totalBalance: 0,
  totalIncome: 0,
  totalExpenses: 0,
  totalDocuments: 0,
  transactions: [],
};

export const transactionsReducer = createReducer(
  initialTransactionsState,

  on(
    TransactionsActions.getTransactionsWithTotalsSuccess,
    (state, { transactionsWithTotals }) => ({
      ...state,
      totalBalance: transactionsWithTotals.totalBalance || 0,
      totalIncome: transactionsWithTotals.totalIncome || 0,
      totalExpenses: transactionsWithTotals.totalExpenses || 0,
      totalDocuments: transactionsWithTotals.totalDocuments || 0,
      transactions: removeDuplicatesAndSort(
        state.transactions,
        transactionsWithTotals.transactions
      ),
    })
  ),
  on(TransactionsActions.createTransaction, (state) => ({
    ...state,
  })),
  on(
    TransactionsActions.createTransactionSuccess,
    (state, { transaction }) => ({
      ...state,
      totalBalance: state.totalBalance + transaction.amount,
      totalIncome:
        transaction.amount > 0
          ? state.totalIncome + transaction.amount
          : state.totalIncome,
      totalExpenses:
        transaction.amount < 0
          ? state.totalIncome + transaction.amount
          : state.totalExpenses,
      totalDocuments: state.totalDocuments + 1,

      transactions: [...state.transactions, transaction].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    })
  ),
  on(
    TransactionsActions.deleteTransactionSuccess,
    (state, { transactionId }) => ({
      ...state,
      transactions: state.transactions.filter(
        (transaction) => transaction._id !== transactionId
      ),
    })
  )
);

const removeDuplicatesAndSort = (
  transactions: Transaction[],
  newTransactions: Transaction[]
): Transaction[] => {
  const map = new Map<string, Transaction>();

  transactions.forEach((transaction) => {
    map.set(transaction._id!, transaction);
  });

  newTransactions.forEach((transaction) => {
    map.set(transaction._id!, transaction);
  });

  const uniqueTransactions = Array.from(map.values());
  const result: Transaction[] = [];

  uniqueTransactions.forEach((transaction) => {
    const index = binarySearch(result, new Date(transaction.date));

    result.splice(index, 0, transaction);
  });

  return result;
};

const binarySearch = (arr: Transaction[], date: Date) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midDate = new Date(arr[mid].date).getTime();

    if (midDate === date.getTime()) {
      return mid;
    } else if (midDate > date.getTime()) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};
