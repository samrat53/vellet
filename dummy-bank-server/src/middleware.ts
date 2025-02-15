import { NextFunction, Response } from "express";
import { ExtendedRequest } from "./config/types";
import prisma from "./db";
import { getCache, setCache } from "./cache/cache_functions";

const CACHE_TTL = 6000;
const verifyAccountNumber = async (req: ExtendedRequest, res: Response, next:NextFunction) => {
    const accountNum = Number(req.params.id);
    if(!accountNum) {
        res.status(401).json({message: "Invalid account Number"});
        return;
    }
    try {
        const cacheKey = `verify-user:${accountNum}`
        const cacheData = await getCache(cacheKey);
        if(cacheData) {
            console.log('cache hit');
            req.verify = true;
            next();
            return;
        }

        console.log('cache miss');
        const id = await prisma.user.findFirst({
            where: {
                accountNum: accountNum
            }
        });
        if(id) {
            req.verify = true;
            await setCache(cacheKey, true, CACHE_TTL);
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