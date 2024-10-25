export interface TransactionsState {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactions: Transaction[];
}

export interface NewTransactionFormData {
  amount: number;
  category: string;
  message: string;
  date: string | Date;
}

export interface Transaction {
  _id: string | null;
  userId: string;
  amount: number;
  category: string;
  message: string;
  date: Date;
}
