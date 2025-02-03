import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import walletRouter from "./wallet-api/index"

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/v1", walletRouter);

app.listen(PORT, () => console.log(`Server live at PORT ${PORT}`));
