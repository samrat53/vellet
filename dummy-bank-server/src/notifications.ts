import { getRedisClient } from "./config/createRedisClient";
import { txnType } from "./config/types";
import prisma from "./db";


export const pushToNotificationsQueue = async(amount: number, type: txnType, accountNum: number, txnId: number) => {
    const user = await prisma.user.findUnique({
        where: { accountNum: accountNum },
        select: { email: true, balance: true },
    })
    const email = user?.email;
    const balance = user?.balance;
    const redisCLient = getRedisClient();
    try {
        console.log(`Transfer push to notification queue with details: ${JSON.stringify({amount, type, email, txnId, balance})}`)
        await redisCLient.rpush("notifications", JSON.stringify({amount, type, email, txnId, balance}));
        await new Promise(r => setTimeout(r, 500));
    } catch (error) {
        console.log("ERROR:", error);
    }
};