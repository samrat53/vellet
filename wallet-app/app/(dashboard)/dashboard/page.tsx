import ShowDetails from "@/app/components/showUserToken";
import { LogoutButton, SigninButton } from "@/app/components/signin_logout_buttons";
import TrasnferWithBank from "@/app/components/testing/bankMoneyTxn";
import WalletBalance from "@/app/components/testing/getBalance";
import P2PTransfer from "@/app/components/testing/transfers";
import { Button } from "@/components/ui/button";

export default function () {
    return (
        <>
        <div>
            Dashboard
            <Button>Hello from shhadcn</Button>
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
        </>
    )
}