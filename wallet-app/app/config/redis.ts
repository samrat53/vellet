import Redis from "ioredis";

const createRedisClient = () => {
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