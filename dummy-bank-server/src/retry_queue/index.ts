import { getRedisClient } from "../config/createRedisClient"
import { createNewBankTransaction } from "../createTransaction";


export const processRetryQue = async() => {
    const redisCLient = getRedisClient();
    console.warn("jjjkbhdfb");
    while(true) {
        try {
            const item = await redisCLient.brpop("txn.walletToBank", 0);
            if(!item) continue;
            const[, txnData] = item;
            const {amount, type, accountNum} = JSON.parse(txnData);
            console.log(`Processing transaction: amount = ${amount}, type = ${type}, account = ${accountNum}`);

            const response = await createNewBankTransaction(amount, type, accountNum);
            console.log(response);

            await new Promise(r => setTimeout(r, 2000));
            console.log('pushing txndId to txn.bankToWallet queue with txnid = ', response?.txnId);
            const {txnId, balance, message, status} = response ?? {} ;
            if(response?.status == 200) {
                await redisCLient.rpush("txn.bankToWallet", JSON.stringify({txnId, balance, message, status, amount, type, accountNum}));
            }
            await new Promise(r => setTimeout(r, 2000));
        } catch (error) {
            console.log("ERROR:", error);
        }
    }
};