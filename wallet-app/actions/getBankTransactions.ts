"use server";

import { NEXT_AUTH_CONFIG } from "@/app/config/auth";
import prisma from "@/db";
import { getServerSession } from "next-auth";

export const getBankTransactions = async() => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const accountNumber = session.user.accountNum;
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