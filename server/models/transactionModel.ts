import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  userId?: string;
  savingId?: string;
  category: string;
  amount: number;
  transactionTitle?: string;
  description?: string;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>({
  userId: {
    type: String,
  },
  savingId: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Salary",
      "Food",
      "Transport",
      "Groceries",
      "Rent",
      "Gift",
      "Medicine",
      "Entertainment",
      "Saving",
      "Travel",
      "New Home",
      "Car",
      "Wedding",
    ],
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionTitle: {
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

transactionSchema.pre("validate", function (this: ITransaction, next) {
  if (!this.userId && !this.savingId) {
    return next(new Error("Either userId or savingId is required."));
  }

  if (this.userId && this.savingId) {
    return next(new Error("Only one of userId or savingId can be provided."));
  }

  next();
});

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
