import mongoose, { Document, Schema } from "mongoose";

export interface ISaving extends Document {
  userId: string;
  savingTransactions: [];
  category: string;
  goalAmount: number;
  savingTitle: string;
  description: string;
  date: Date;
}

const savingSchema = new Schema<ISaving>({
  userId: {
    type: String,
    required: true,
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
  goalAmount: {
    type: Number,
    required: true,
  },
  savingTitle: {
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

export default mongoose.model("Saving", savingSchema);
