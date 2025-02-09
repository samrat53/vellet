"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function Proividers({children}: {
    children: ReactNode
}) {
    return <SessionProvider>
        {children}
    </SessionProvider>
}