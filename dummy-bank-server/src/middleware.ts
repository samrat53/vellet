import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ExtendedRequest } from "./config/types";

export default async function(req: ExtendedRequest, res: express.Response, next: express.NextFunction) {
    const accountNum = Number(req.params.id);
    try {
        const id = await prisma.user.findFirst({
            where: {
                accountNum: accountNum
            }
        })
        if(id) {
            req.verify = true;
            next();
        }
        else return res.status(403).json({message: "Your account number donot exists on this bank"});
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({message: "Bank Database busy"});
    }
}