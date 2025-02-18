import BankTxnComponent from "@/components/bankTxnComponent";

export default function () {
    return (
    <div>
        <BankTxnComponent heading = {"Send money to Bank"} description="Send money to bank from wallet" label="Enter amount" type="credit"/>
    </div>
    )
}