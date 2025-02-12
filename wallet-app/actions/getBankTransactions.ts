"use server";

import { accountNumFromCookie } from "@/app/config/getAccountNumInServer";
import prisma from "@/db";


export const getBankTransactions = async() => {
    const accountNumber = await accountNumFromCookie();
    const userTxns = await prisma.bankTransactions.findMany({
        where: {
            accountNum: accountNumber
        },
        select: {
            bankTxnIdByBank: true,
            type: true,
            amount: true,
            time: true
        }
    })
    return userTxns;
};