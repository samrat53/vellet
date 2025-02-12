"use server";

import { accountNumFromCookie } from "@/app/config/getAccountNumInServer";
import prisma from "@/db";

export const p2pTransfer = async(toAccountNumber: number, amount: number) => {
    const fromAccountNumber = await accountNumFromCookie();
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