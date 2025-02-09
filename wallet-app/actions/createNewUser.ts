"use server";
import prisma from "@/db";

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
