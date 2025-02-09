"use client";
import ShowDetails from "./components/showUserToken";
import { LogoutButton, SigninButton } from "./components/signin_logout_buttons";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div>
      Main page
      <SigninButton/>
      <LogoutButton/>
      <ShowDetails/>
    </div>
  );
}
