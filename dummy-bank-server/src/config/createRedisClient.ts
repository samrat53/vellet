import Redis from "ioredis";

const REDIS_MEMORY_LIMIT = "200mb"; // memory limit
const REDIS_POLICY = "allkeys-lru"; // Eviction policy


export const getRedisClient = () => {
    const redis = new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
    });
    
    redis.on('error', (err) => {
        console.log(`Redis connection error: ${err}`);
    });

    redis.once("connect", async() => {
        console.log('Connected to redis server');
        await redis.config('SET', 'maxmemory', REDIS_MEMORY_LIMIT);
        await redis.config('SET', 'maxmemory-policy', REDIS_POLICY);
        console.log(`Redis configured: Memory=${REDIS_MEMORY_LIMIT}, Eviction=${REDIS_POLICY}`);
    })
    return redis;
};


getRedisClient();