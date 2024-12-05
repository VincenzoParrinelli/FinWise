export interface TransactionsState {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  totalTransactionsInDb: number;
  totalSavingsTransactionsInDb: number;
  transactions: Transaction[];
  savingsTransactions: Transaction[];
  dailyTransactions: [];
  weeklyTransactions: [];
  monthlyTransactions: [];
  yearlyTransactions: [];
}

export interface NewTransactionFormData {
  amount: number;
  category: string;
  date: string | Date;
  transactionTitle?: string;
  description?: string;
}

export interface Transaction {
  _id: string | null;
  userId?: string;
  savingId?: string;
  amount: number;
  category: string;
  transactionTitle?: string;
  description?: string;
  date: Date;
}

export interface UpdatedTransactionFormData {
  amount?: number;
  category?: string;
  date?: string | Date;
  transactionTitle?: string;
  description?: string;
}
