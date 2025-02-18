"use client";

import { useSession } from "next-auth/react";

export default function DashBoardHeader() {
    const { data: session } = useSession();

    return (
        <div className="">
            <h1>Name: {session?.user?.name}</h1>
            <h2>Email: {session?.user?.email}</h2>
            <h2>Account Number: {session?.user?.accountNum}</h2> {/* ✅ No TS error */}
        </div>
    );
}