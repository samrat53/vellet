"use server";
import { NEXT_AUTH_CONFIG } from "@/app/config/auth";
import { getServerSession } from "next-auth";

export async function verifyUser(accountNum: number) {
    console.log('At Server account number is:', accountNum);
    
    return true;
}

export async function getAccountNumber() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    console.log(session);
}