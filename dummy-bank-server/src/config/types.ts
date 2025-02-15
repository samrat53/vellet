import { Request, Response, NextFunction } from "express";

export interface ExtendedRequest extends Request {
    verify?: boolean;
}

export interface PayloadType {
    req : ExtendedRequest,
    res: Response,
    next: NextFunction
}

export type txnType = "credit" | "debit";