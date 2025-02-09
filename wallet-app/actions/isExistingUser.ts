"use server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

export default async function isExistingUser(accountNumber: number) {
    const user = await prisma.user.findUnique({where: { accountNum: accountNumber}});
    console.log(user);
    if(user) return true;
    else return false;
}
