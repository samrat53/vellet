import { NextFunction, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ExtendedRequest } from "./config/types";

const verifyAccountNumber = async (req: ExtendedRequest, res: Response, next:NextFunction) => {
    const accountNum = Number(req.params.id);
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