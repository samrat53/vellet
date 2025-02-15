import { getRedisClient } from "../config/createRedisClient";

const redisClient = getRedisClient();

export async function setCache(key: string, value: any, ttl: number = 300) {
    await redisClient.set(key, JSON.stringify(value), "EX", ttl);
    console.log(`Cached: ${key} (Expires in ${ttl} sec)`);
}

export async function getCache(key: string) {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
}

export async function deleteCache(key: string) {
    await redisClient.del(key);
    console.log(`Cache deleted: ${key}`);
}