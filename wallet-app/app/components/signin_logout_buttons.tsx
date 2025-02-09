"use client";

import { signIn, signOut } from "next-auth/react"

export const SigninButton= () => {
    return <>
    <div>
        <button className="border-4" onClick={() => signIn()}>Signin</button>
    </div>
    </>
}

export const LogoutButton= () => {
    return <>
    <div>
        <button className="border-4" onClick={() => signOut()}>Logout</button>
    </div>
    </>
}
