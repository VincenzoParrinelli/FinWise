export interface SavingsState {
  totalDocuments: number;
  savings: Saving[];
}

export interface Saving {
  _id: string | null;
  userId: string;
  category: string;
  goalAmount: number;
  savingTitle?: string;
  description?: string;
  date: Date;
}

export interface NewSavingFormData {
  amountGoal: number;
  category: string;
  date: string | Date;
  savingTitle?: string;
  description?: string;
}
