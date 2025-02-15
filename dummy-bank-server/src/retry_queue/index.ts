import { getRedisClient } from "../config/createRedisClient"
import { createNewBankTransaction } from "../createTransaction";


export const processRetryQue = async() => {
    const redisCLient = getRedisClient();
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
        } catch (error) {
            console.log("ERROR:", error);
        }
    }
};