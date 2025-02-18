export type txnType = "credit" | "debit";
    // type === "credit" means credit to bank (debit from wallet)
    // type ==='debit means debit from bank

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            accountNum: number;  // ✅ Add the missing property
        };
    }
}