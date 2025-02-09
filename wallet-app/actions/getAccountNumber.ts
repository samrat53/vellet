'use server'
import { NEXT_AUTH_CONFIG } from "@/app/config/auth";
import { getServerSession } from "next-auth";

export async function getAccountNumber() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    console.log(session);
}