import { getRedisClient } from "./createRedisClient"

const main = async() => {
    const redisCLient = getRedisClient();
    while(true) {
        try {
            const item = await redisCLient.brpop("txn.walletToBank", 0);
            if(!item) continue;
            const[, txnData] = item;
            const {amount, type} = JSON.parse(txnData);
            console.log(`Processing transaction: amount = ${amount}, type = ${type}`);
        } catch (error) {
            console.log("ERROR:", error);
        }
    }
}

main();