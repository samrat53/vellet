"use server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function createNewUser({name, password, email, accountNum}: {
    name: string,
    password: string,
    email: string,
    accountNum: number
}) {
    try {
        const user = await prisma.user.create({
            data: {
                name, email, accountNum, password
            }
        });
        console.log(user);
        return;
    } catch (error) {
        console.log(error);
        return "Database error";
    }
}
