export interface TransactionsState {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  totalDocuments: number;
  transactions: Transaction[];
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
  userId: string;
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
