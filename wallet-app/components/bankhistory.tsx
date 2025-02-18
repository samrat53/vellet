import { getBankTransactions } from "@/actions/getBankTransactions";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function BankHistory() {
    const history = await getBankTransactions();

    return (
        <div>
        <Table>
            <TableCaption>A list of your recent transactions.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history.map((txn) => (
                    <TableRow key={txn.bankTxnIdByBank}>
                        <TableCell className="font-medium">{txn.bankTxnIdByBank}</TableCell>
                        <TableCell>{txn.type}</TableCell>
                        <TableCell>₹. {txn.amount}</TableCell>
                        <TableCell>{new Date(txn.time).toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    );
}
