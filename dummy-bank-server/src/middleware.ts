import { NextFunction, Response } from "express";
import { ExtendedRequest } from "./config/types";
import prisma from "./db";
const verifyAccountNumber = async (req: ExtendedRequest, res: Response, next:NextFunction) => {
    const accountNum = Number(req.params.id);
    if(!accountNum) {
        res.status(401).json({message: "Invalid account Number"});
        return;
    }
    try {
        const id = await prisma.user.findFirst({
            where: {
                accountNum: accountNum
            }
        });
        if(id) {
            req.verify = true;
            next();
        }
        else return res.status(401).json({ message: "Your account number couldnot be authenticated with the bank" });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Bank Database error" });
    }
}
export default verifyAccountNumber;