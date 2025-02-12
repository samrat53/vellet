"use server";

import { NEXT_AUTH_CONFIG } from "@/app/config/auth";
import prisma from "@/db";
import { getServerSession } from "next-auth";

export const p2pTransfer = async(toAccountNumber: number, amount: number) => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const fromAccountNumber = session.user.accountNum;
    console.log(toAccountNumber, "TO account number")
    //checks
    try {
        const fromUser = await prisma.user.findUnique({
            where: {
                accountNum: fromAccountNumber
            },
            select: {
                walletBalance: true
            }
        });
        if(fromUser && fromUser?.walletBalance < amount) return "Not enough balance on wallet";
        const toUser = await prisma.user.findUnique({
            where: {
                accountNum: toAccountNumber
            },
        });
        if(!toUser) return "Invalid benificiary";
    } catch (error) {
        console.log(error);
        return "Error on server";
    }
    
    // actual transfers
    try{
        const [debit, credit] = await prisma.$transaction([
            prisma.user.update({
                where: {
                    accountNum: fromAccountNumber,
                },
                data: {
                    walletBalance: {decrement: amount},
                }
            }),

            prisma.user.update({
                where: {
                    accountNum: toAccountNumber,
                },
                data: {
                    walletBalance: {increment: amount},
                }
            }),
        // later: add entry to PeerToPeer transactions table
        ])

        return "Transaction succesfull";

    }catch(error) {
        console.log(error);
        return "server error"
    }
}