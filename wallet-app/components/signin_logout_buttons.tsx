"use client";

import { signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button";

export const SigninButton= () => {
    return <>
    <div>
        <button className="border radius" onClick={() => signIn()}>Signin</button>
    </div>
    </>
}

export const LogoutButton= () => {
    return <>
    <div>
        <Button onClick={() => signOut()}>Logout</Button>
    </div>
    </>
}
