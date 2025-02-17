"use client";
import { accountNumFromCookie } from "@/app/config/getAccountNumInServer";
import { useSession } from "next-auth/react";

export default function ShowDetails() {
    const session = useSession();
    return <>
    <button onClick={() => console.log(accountNumFromCookie)}>Log account number from backend terminal</button>
    <div>
      <h1>frontend token stored</h1>
      {JSON.stringify(session)};
    </div>   
    </>
}