import { NEXT_AUTH_CONFIG } from "@/app/config/auth";
import { getServerSession } from "next-auth";

export async function accountNumFromCookie() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    return session.user.accountNum;
}