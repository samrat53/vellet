import BankTxnComponent from "@/components/bankTxnComponent";

export default function () {
    return (
    <div>
        <BankTxnComponent heading = {"Recharge Wallet"} description="Get money from bank to wallet" label="Enter amount" type="debit"/>
    </div>
    )
}