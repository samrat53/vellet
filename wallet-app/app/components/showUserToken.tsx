"use client";
import { useSession } from "next-auth/react";
import { accountNumFromCookie } from "../config/getAccountNumInServer";

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