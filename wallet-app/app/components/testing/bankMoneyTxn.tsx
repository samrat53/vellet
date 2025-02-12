"use client";

import { bankTransfers } from "@/actions/bankTransfers";
import { useState } from "react";

export default function TrasnferWithBank() {
    const [message, setMessage] = useState("");
    const handleTransfer = async () => {
        const response = await bankTransfers(4000, "credit");
        setMessage(JSON.stringify(response));
    }
    return (
        <>
        <button onClick={handleTransfer}>Get Money from bank</button>
        {message && <div>{message}</div>}
        </>
    )
}