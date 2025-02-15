
import Redis from "ioredis";

export const createRedisClient = () => {
    const redis = new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
    });
    
    redis.on('error', (err) => {
        console.log(`Redis connection error: ${err}`);
    });
    console.log('connected to redis server');
    return redis;
};
let redisCLient: Redis;
export function getRedisClient() {
    if(!redisCLient) redisCLient = createRedisClient();
    return redisCLient;
};
getRedisClient();

// worker:
const main = async () => {
    const redisCLient = getRedisClient();
    while(true) {
        try {
            const item = await redisCLient.blpop("notifications", 0);
            if(!item) continue;
            const[, emailData] = item;
            const {amount, type, email, txnId, balance} = JSON.parse(emailData);
            console.log(`Send email to ${email}, transaction: id = ${txnId}, current balance: ${balance}, amount of transfer: ${amount} of type: ${type}`);
            await new Promise(r => setTimeout(r, 2000));
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }
}
main();