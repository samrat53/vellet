"use client";
import ShowDetails from "./components/showUserToken";
import { LogoutButton, SigninButton } from "./components/signin_logout_buttons";
import { useSession } from "next-auth/react";
import P2PTransfer from "./components/testing/transfers";

export default function Home() {
  const session = useSession();
  return (
    <div>
      Main page
      <SigninButton/>
      <LogoutButton/>
      <ShowDetails/>
      <br />
      <br />
      <P2PTransfer/>
    </div>
  );
}
