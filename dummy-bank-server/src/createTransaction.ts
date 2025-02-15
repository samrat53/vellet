import prisma from "./db";
import { txnType } from "./config/types";
export const createNewBankTransaction = async(amount: number, type: txnType, accountNum: number) =>{
    
    try {
        const userInfo = await prisma.user.findUnique({
            where: { accountNum: accountNum },
            select: { balance: true, }
        });
        if(type === "debit" && userInfo && userInfo?.balance < amount) {
            return {
                status: 401,
                message: "Insufficient balance in bank account"
            };
        }
    }
    catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Wallet Database down mara hua hai"
        };
    }
        
    if(type === "debit") {
        try {
            const [updatedUser, transaction] = await prisma.$transaction([
                prisma.user.update({
                    where: { accountNum: accountNum },
                    data: { balance: { decrement: amount }}
                }),
                prisma.transactions.create({
                    data: {
                        accountId: accountNum,
                        status: "success",
                        ammount: amount,
                        type: type,
                    },
                    select: { txnId: true, }
                })
            ]);
            return {
                status: 200,
                message: `Transfer successfull of amount ${amount} to wallet`,
                txnId: transaction.txnId,
                balance: updatedUser.balance
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Wallet Database down mara hua hai"
            };
        }
    }
        
    else if(type === "credit") {
        try {
            const [updatedUser, transaction] = await prisma.$transaction([
                prisma.user.update({
                    where: { accountNum: accountNum },
                    data: { balance: { increment: amount }}
                }),
                prisma.transactions.create({
                    data: {
                        accountId: accountNum,
                        status: "success",
                        ammount: amount,
                        type: type,
                    },
                    select: { txnId: true, }
                })
            ]);
            return {
                status: 200,
                message: `Transfer successfull of amount ${amount} from bank`,
                txnId: transaction.txnId,
                balance: updatedUser.balance
            };
        }
        catch (error) {
            console.log(error);
            return { 
                status:500,
                message: "Wallet Database down mara hua hai"
            };
        }
    }   
}