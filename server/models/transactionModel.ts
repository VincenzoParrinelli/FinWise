import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  userId: string;
  category: string;
  amount: string;
  description: string;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>({
  userId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Silverware",
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
    type: String,
    required: true,
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

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
