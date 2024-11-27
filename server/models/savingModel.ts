import mongoose, { Document, Schema } from "mongoose";

export interface ISaving extends Document {
  userId: string;
  category: string;
  savedAmount: number;
  goalAmount: number;
  savingTitle: string;
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
  savedAmount: {
    type: Number,
    default: 0,
    required: true,
  },
  goalAmount: {
    type: Number,
    required: true,
  },
  savingTitle: {
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
