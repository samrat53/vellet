import { getWalletBalance } from "@/actions/getWalletBalance";

export default async function WalletBalance() {
    const balance = await getWalletBalance(); // ✅ Safe in a server component

    return (
        <div>
            <h2>Wallet Balance</h2>
            <p>Balance: {typeof balance === "number" ? `$${balance}` : balance}</p>
        </div>
    );
}
