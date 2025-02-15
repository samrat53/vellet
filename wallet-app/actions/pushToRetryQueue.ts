import { getRedisClient } from "@/app/config/redis";
import { txnType } from "@/app/config/types";

export const pushToBankQueue = async (amount: number, type: txnType) => {
    try{
        const redisCLient = getRedisClient();
        await redisCLient.lpush("txn.walletToBank", JSON.stringify({amount, type}));
        // wallet to bank: lpush and rpop
    }
    catch(error: any) {
        console.log(error);
    }
}