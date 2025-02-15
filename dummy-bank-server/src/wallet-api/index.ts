import { NextFunction, Router, Response } from "express";
const router = Router();
import verifyAccountNumber from "../middleware"
import { ExtendedRequest } from "../config/types";
import { createNewBankTransaction } from "../createTransaction";

router.get("/verify-user/:id", (req: ExtendedRequest, res: Response, next:NextFunction) => {
        verifyAccountNumber(req, res, next)
    },
    async(req: ExtendedRequest, res: Response) => {
        if(req.verify) {
            res.status(200).json({ message: 'verified' });
            return;
        } 
        return ; // if authenticated, then the middleware will return, this line will not be reached
    }
);

router.post("/transfer/:id",(req: ExtendedRequest, res: Response, next:NextFunction) => {
        verifyAccountNumber(req, res, next)
    },
    async(req:ExtendedRequest, res: Response) => {
        if(!req.verify) {
            res.status(401).json({message: "not verified user"});
            return;
        }
        const accountNum: number = Number(req.params.id);
        const amount: number = Number(req.body.amount);
        const type: string = String(req.body.type);
        if (!req.body.amount || isNaN(amount) || amount <= 0 || (type !== "debit" && type !== "credit")) {
            res.status(400).json({ message: "Invalid amount or type of transfer" });
            console.log(type);
            console.log("ammount:", amount," accountNum:", accountNum);
            return;
        }
        const response = await createNewBankTransaction(amount, type, accountNum);
        res.status(response?.status || 500).json(response);
    }
);
export default router;
