import { retriedTxns } from "@/actions/processRetriedTxns";
import Redis from "ioredis";

export const getRedisClient = () => {
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
// export function getRedisClient() {
//     if(!redisCLient) redisCLient = createRedisClient();
//     return redisCLient;
// };
getRedisClient();
retriedTxns();