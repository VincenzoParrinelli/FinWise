export interface SavingsState {
  savings: Saving[];
  totalDocuments: number;
}

export interface Saving {
  _id: string | null;
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
