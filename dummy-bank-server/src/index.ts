import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import walletRouter from "./wallet-api/index"
import { processRetryQue } from "./retry_queue";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/v1", walletRouter);
processRetryQue();

app.listen(PORT, () => console.log(`Main bank server live at PORT ${PORT}`));