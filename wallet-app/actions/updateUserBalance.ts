"use server";

import { txnType } from "@/app/config/types";
import prisma from "@/db";

export const updateUserBalance = async(type: txnType, amount: number, accountNum: number) => {
    
    if(type === "credit") {
        await prisma.user.update({
            where: { accountNum: accountNum},
            data: { walletBalance: {decrement: amount}}
        })
    }
    else {
        await prisma.user.update({
            where: { accountNum: accountNum},
            data: { walletBalance: {increment: amount}}
        })
    }
    // type === "credit" means credit to bank
    // type ==='debit means debit from bank
}