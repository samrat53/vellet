"use server";

import { accountNumFromCookie } from "@/app/config/getAccountNumInServer";
import prisma from "@/db";

export const getWalletBalance = async() => {
    const fromAccountNumber = await accountNumFromCookie();
    try {
        const user = await prisma.user.findUnique({ 
            where: {
                accountNum: fromAccountNumber
            },
            select: {
                walletBalance: true
            }
        });
        return user?.walletBalance;
    }
    catch(error) {
        console.log(error);
        return "Error on fetching balance"
    }
}