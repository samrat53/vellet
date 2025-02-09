"use server";
import prisma from "@/db";

export default async function isExistingUser(accountNumber: number) {
    const user = await prisma.user.findUnique({where: { accountNum: accountNumber}});
    console.log(user);
    if(user) return true;
    else return false;
}
