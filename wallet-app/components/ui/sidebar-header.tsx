"use client";

import { getWalletBalance } from "@/actions/getWalletBalance";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function SidebarHeader() {
    const { data: session } = useSession();
    const [balance, setBalance] = useState<number | string | undefined>("Loading...");

    useEffect(() => {
        const fetchBalance = async () => {
            const balanceData = await getWalletBalance();
            setBalance(balanceData);
        };

        fetchBalance();
    }, []);

    return (
        <div>
            <h1>Name: {session?.user?.name}</h1>
            <h2>Balance: {balance}</h2>
        </div>
    );
}
