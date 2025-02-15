"use server";

import { txnType } from "@/app/config/types";
import axios from "axios";
import { updateUserBalance } from "./updateUserBalance";
import { createNewBankTransaction } from "./createNewBankTxn";
import { accountNumFromCookie } from "@/app/config/getAccountNumInServer";
import { getRedisClient } from "@/app/config/redis";
const BANK_URL = process.env.BANK_SERVER;


export const bankTransfers = async(amount: number, type: txnType) => {
    const accountNum = await accountNumFromCookie();
    // flow:
    // hit bank db:
    //     - if status == 200 then update the bankTxns table with the txnId received from bank, and update wallet balance.
    //     - else push to a redis queue to retry later with the bank server
    try {
        const response = await axios.post(`${BANK_URL}/transfer/${accountNum}`, {
            amount: amount,
            type: type
        });
        console.log(response.data.message);
        if(response.status == 200) {
            await updateUserBalance(type, amount);
            await createNewBankTransaction(response.data.txnId, type, amount);

            return "Transfer done";
        }
        
    } catch (error: any) {
        console.error("Error contacting bank server:", error.message);

        if (error.code === "ECONNREFUSED") {
            console.log("Bank server is down, pushing to Redis queue...");
            // Push to Redis queue for later processing
            
            const redisCLient = getRedisClient();
            await redisCLient.lpush("try_push", `hello from nextjs`)
            return "Bank server is down, transaction will be retried later.";
        } 
        else if (error.response) {
            console.log("Bank server error:", error.response.data);
            return `Bank error: ${error.response.data.message || "Unknown error"}`;
        }
        else {
            return "Unexpected error occurred, please try again.";
        }
    }
}