import { NextFunction, Router, Response } from "express";
const router = Router();
import verifyAccountNumber from "../middleware"
import { ExtendedRequest } from "../config/types";

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


export default router;
