export interface TransactionsState {
  transactions: Transaction[];
}

export interface NewTransactionFormData {
  amount: string;
  category: string;
  message: string;
  date: string | Date;
}

export interface Transaction {
  _id: string | null;
  userId: string;
  amount: string;
  category: string;
  message: string;
  date: Date;
}
