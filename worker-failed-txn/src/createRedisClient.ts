import Redis from "ioredis";

const createRedisClient = () => {
    const redis = new Redis({
        host: "localhost",
        port: 6379,
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