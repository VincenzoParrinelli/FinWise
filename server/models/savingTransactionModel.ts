import mongoose, { Document, Schema } from "mongoose";

export interface ISavingTransaction extends Document {
  savingId: string;
  amount: number;
  savingTransactionTitle: string;
  description: string;
  date: Date;
}

const savingTransactionSchema = new Schema<ISavingTransaction>({
  savingId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  savingTransactionTitle: {
    type: String,
    maxLength: "50",
  },
  description: {
    type: String,
    maxLength: "50",
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("SavingTransaction", savingTransactionSchema);
