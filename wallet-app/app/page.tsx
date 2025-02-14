// "use client";
import ShowDetails from "./components/showUserToken";
import { LogoutButton, SigninButton } from "./components/signin_logout_buttons";
// import { useSession } from "next-auth/react";
import P2PTransfer from "./components/testing/transfers";
import WalletBalance from "./components/testing/getBalance";
import TrasnferWithBank from "./components/testing/bankMoneyTxn";

export default function Home() {
  // const session = useSession();  // use in client only
  return (
    <div>
      Main page
      <SigninButton/>
      <LogoutButton/>
      <ShowDetails/>
      <br />
      <br />
      <P2PTransfer/>
      <br />
      <br />
      <WalletBalance/>
      <br />
      <br />
      <div>money transfer from bank</div>
      <TrasnferWithBank/>
    </div>
  );
}
