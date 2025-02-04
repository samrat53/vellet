import { NextFunction, Router, Response } from "express";
const router = Router();
import verifyAccountNumber from "../middleware"
import { ExtendedRequest } from "../config/types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
        try {
            const userInfo = await prisma.user.findUnique({
                where: { accountNum: accountNum },
                select: { balance: true, }
            });
            if(type === "debit" && userInfo && userInfo?.balance < amount) {
                res.status(401).json({message: "Insufficient balance in bank account"});
                return;
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Wallet Database down mara hua hai"});
        }
            
        if(type === "debit") {
            try {
                const [updatedUser, transaction] = await prisma.$transaction([
                    prisma.user.update({
                        where: { accountNum: accountNum },
                        data: { balance: { decrement: amount }}
                    }),
                    prisma.transactions.create({
                        data: {
                            accountId: accountNum,
                            status: "success",
                            ammount: amount,
                            type: type,
                        },
                        select: { txnId: true, }
                    })
                ]);
                res.status(200).json({
                    message: `Transfer successfull of amount ${amount} to wallet`,
                    txnId: transaction.txnId,
                    balance: updatedUser.balance
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({message: "Wallet Database down mara hua hai"});
            }
            return;
        }
            
        else if(type === "credit") {
            try {
                const [updatedUser, transaction] = await prisma.$transaction([
                    prisma.user.update({
                        where: { accountNum: accountNum },
                        data: { balance: { increment: amount }}
                    }),
                    prisma.transactions.create({
                        data: {
                            accountId: accountNum,
                            status: "success",
                            ammount: amount,
                            type: type,
                        },
                        select: { txnId: true, }
                    })
                ]);
                res.status(200).json({
                    message: `Transfer successfull of amount ${amount} from`,
                    txnId: transaction.txnId,
                    balance: updatedUser.balance
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({message: "Wallet Database down mara hua hai"});
            }
            return;
        }
    }
);
export default router;
