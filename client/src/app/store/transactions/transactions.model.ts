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
  message?: string;
}

export interface Transaction {
  _id: string | null;
  userId: string;
  amount: number;
  category: string;
  message: string;
  date: Date;
}
