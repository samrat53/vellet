import { getRedisClient } from "@/app/config/redis";
import prisma from "@/db";
import { updateUserBalance } from "./updateUserBalance";
import { createNewBankTransaction } from "./createNewBankTxn";

export const retriedTxns = async () => {
    const redisCLient = getRedisClient();
    while(true) {
        try {
            const item = await redisCLient.blpop("txn.bankToWallet", 0);
            if(!item) continue;
            const[, txnData] = item;
            const {txnId, balance, message, status, amount, type, accountNum} = JSON.parse(txnData);
            console.log(`Processing transaction: id = ${txnId}, balance: ${balance}, message = ${message}, amount: ${amount}`);
            await createNewBankTransaction(txnId, type, amount, accountNum);
            await updateUserBalance(type, amount, accountNum);
            await new Promise(r => setTimeout(r, 2000));
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }
}