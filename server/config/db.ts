import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
  } catch {}
};

export default connectDb;
