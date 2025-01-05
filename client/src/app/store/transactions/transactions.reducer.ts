import { createReducer, on } from '@ngrx/store';
import { Transaction, TransactionsState } from './transactions.model';
import * as TransactionsActions from './transactions.actions';

export const initialTransactionsState: TransactionsState = {
  totalBalance: 0,
  totalIncome: 0,
  totalExpenses: 0,
  totalTransactionsInDb: 0,
  totalSavingsTransactionsInDb: 0,
  totalSearchedTransactionsInDb: 0,
  transactions: [],
  randomGroupedTransaction: null,
  savingsTransactions: [],
  filteredByDateTransactions: [],
  searchedTransactions: [],
  dailyTransactions: [],
  weeklyTransactions: [],
  monthlyTransactions: [],
  yearlyTransactions: [],
};

export const transactionsReducer = createReducer(
  initialTransactionsState,

  on(
    TransactionsActions.getTransactionsWithTotalsSuccess,
    (state, { transactionsWithTotals, savingId }) => {
      if (savingId) {
        return {
          ...state,
          totalSavingsTransactionsInDb:
            transactionsWithTotals.totalSavingsTransactionsInDb || 0,
          savingsTransactions: [
            ...state.savingsTransactions,
            ...transactionsWithTotals.transactions,
          ],
        };
      }

      return {
        ...state,
        totalBalance: transactionsWithTotals.totalBalance || 0,
        totalIncome: transactionsWithTotals.totalIncome || 0,
        totalExpenses: transactionsWithTotals.totalExpenses || 0,
        totalTransactionsInDb:
          transactionsWithTotals.totalTransactionsInDb || 0,
        transactions: [
          ...state.transactions,
          ...transactionsWithTotals.transactions,
        ],
      };
    }
  ),
  on(
    TransactionsActions.getRandomGroupedTransactionSuccess,
    (state, { randomGroupedTransaction }) => ({
      ...state,
      randomGroupedTransaction,
    })
  ),
  on(
    TransactionsActions.getTransactionsByDateSuccess,
    (state, { filteredByDateTransactions }) => ({
      ...state,
      filteredByDateTransactions,
    })
  ),
  on(TransactionsActions.getTransactionsBySearch, (state, { page }) => {
    if (page === 1)
      return {
        ...state,
        searchedTransactions: [],
        totalSearchedTransactionsInDb: 0,
      };

    return {
      ...state,
    };
  }),
  on(
    TransactionsActions.getTransactionsBySearchSuccess,
    (state, { searchedTransactions }) => ({
      ...state,
      searchedTransactions: [
        ...state.searchedTransactions,
        ...searchedTransactions.searchedTransactions,
      ],

      totalSearchedTransactionsInDb:
        searchedTransactions.totalSearchedTransactionsInDb,
    })
  ),
  on(
    TransactionsActions.getGroupedTransactionsSuccess,
    (state, { groupedTransactions, group }) => {
      switch (group) {
        case 'Daily':
          return {
            ...state,
            dailyTransactions: groupedTransactions,
          };

        case 'Weekly':
          return {
            ...state,
            weeklyTransactions: groupedTransactions,
          };

        case 'Monthly':
          return {
            ...state,
            monthlyTransactions: groupedTransactions,
          };

        case 'Yearly':
          return {
            ...state,
            yearlyTransactions: groupedTransactions,
          };

        default:
          return {
            ...state,
          };
      }
    }
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
          ? state.totalExpenses + transaction.amount
          : state.totalExpenses,
      totalTransactionsInDb: state.totalTransactionsInDb + 1,
      transactions: [...state.transactions, transaction].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    })
  ),
  on(
    TransactionsActions.createSavingTransactionSuccess,
    (state, { transaction }) => ({
      ...state,
      totalSavingsTransactionsInDb: state.totalSavingsTransactionsInDb + 1,
      savingsTransactions: [...state.savingsTransactions, transaction].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    })
  ),
  on(
    TransactionsActions.updateTransactionSuccess,
    (state, { updatedTransactionFormData, id }) => {
      let transactionToUpdate = null as Transaction | null;

      const updatedTransactions = state.transactions.map((transaction) => {
        if (transaction._id !== id) return transaction;

        transactionToUpdate = transaction;

        return {
          ...transaction,
          ...updatedTransactionFormData,
          date: updatedTransactionFormData.date
            ? new Date(updatedTransactionFormData.date)
            : transaction.date,
        };
      });

      if (!transactionToUpdate) return state;

      const oldAmount = transactionToUpdate.amount;
      const newAmount = updatedTransactionFormData.amount;

      return {
        ...state,
        totalBalance: newAmount
          ? state.totalBalance - oldAmount + newAmount
          : state.totalBalance,
        totalIncome:
          newAmount && newAmount > 0
            ? state.totalIncome - (oldAmount > 0 ? oldAmount : 0) + newAmount
            : state.totalIncome,
        totalExpenses:
          newAmount && newAmount < 0
            ? state.totalExpenses - (oldAmount < 0 ? oldAmount : 0) + newAmount
            : state.totalExpenses,
        transactions: updatedTransactions,
      };
    }
  ),
  on(
    TransactionsActions.deleteTransactionSuccess,
    (state, { transactionId }) => ({
      ...state,
      totalTransactionsInDb: state.totalTransactionsInDb - 1,
      transactions: state.transactions.filter(
        (transaction) => transaction._id !== transactionId
      ),
    })
  )
);
