import express, { Express } from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

connectDb();

app.use(cors());
app.use(bodyparser.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
