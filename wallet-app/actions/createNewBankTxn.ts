"use server";

import { txnType } from "@/app/config/types";
import prisma from "@/db";

export const createNewBankTransaction = async(txnId: number, type: txnType, amount: number, accountNum: number) => {
    await prisma.bankTransactions.create({
        data: {
            bankTxnIdByBank: txnId,
            accountNum: accountNum,
            type: type,
            amount: amount
        }
    });
    // type === "credit" means credit to bank
    // type ==='debit means debit from bank
}