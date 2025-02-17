"use client";
import { useState } from "react";
import { p2pTransfer } from "@/actions/p2ptransfers";

export default function P2PTransfer() {
    const [message, setMessage] = useState("");

    const handleTransfer = async () => {
        try {
            const response = await p2pTransfer(5, 100);
            setMessage(JSON.stringify(response));
        } catch (error) {
            // Type assertion for error
            if (error instanceof Error) {
                setMessage(`Error: ${error.message}`);
            } else {
                setMessage("An unknown error occurred");
            }
        }
    };

    return (
        <div>
            <button onClick={handleTransfer}>Send</button>
            {message && <p>{message}</p>}
        </div>
    );
}
