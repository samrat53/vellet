import { NEXT_AUTH_CONFIG } from "@/app/config/auth";
import { getServerSession } from "next-auth";

export async function accountNumFromCookie() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session || !session.user) {
        throw new Error("User session not found. Please log in again.");
    }
    return session.user.accountNum;
}