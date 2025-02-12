"use server";

import { NEXT_AUTH_CONFIG } from "@/app/config/auth";
import prisma from "@/db";
import { getServerSession } from "next-auth";

export const getWalletBalance = async() => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const fromAccountNumber = session.user.accountNum;
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