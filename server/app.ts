import express, { Express } from "express";
import bodyparser from "body-parser";
import connectDb from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

connectDb();

app.use(bodyparser.json());

app.listen(port, () => {});

export default app;
