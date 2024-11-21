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
  date: Date;
}

export interface NewSavingFormData {
  goalAmount: number;
  category: string;
  date: string | Date;
  savingTitle?: string;
}
