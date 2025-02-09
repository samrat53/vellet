"use client";
import { getAccountNumber } from "@/actions/getAccountNumber";
import { useSession } from "next-auth/react";

export default function ShowDetails() {
    const session = useSession();
    return <>
    <button onClick={getAccountNumber}>Log account number from backend terminal</button>
    <div>
      <h1>frontend token stored</h1>
      {JSON.stringify(session)};
    </div>   
    </>
}