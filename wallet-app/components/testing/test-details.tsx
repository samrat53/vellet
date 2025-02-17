import TrasnferWithBank from "@/components/testing/bankMoneyTxn";
import WalletBalance from "@/components/testing/getBalance";
import P2PTransfer from "@/components/testing/transfers";
import ShowDetails from "@/components/showUserToken";
import { LogoutButton, SigninButton } from "@/components/signin_logout_buttons";
import { Button } from "@/components/ui/button";

export default function() {
    return (
        <div>

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
    )
}