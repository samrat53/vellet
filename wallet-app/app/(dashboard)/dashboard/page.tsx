import BankHistory from "@/components/bankhistory";
import DashBoardHeader from "@/components/dashBoardHeader";

export default function () {
    return (
        <>
        <div className="w-full p-12 text-center">
            {/* <h1>Dashboard</h1> */}
            <DashBoardHeader/>
            <h2 className="underline p-10">Bank Transaction History</h2>
            <BankHistory/>
        </div>
        </>
    )
}