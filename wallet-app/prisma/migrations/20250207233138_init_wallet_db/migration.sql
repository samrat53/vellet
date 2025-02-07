-- CreateEnum
CREATE TYPE "TxnType" AS ENUM ('credit', 'debit');

-- CreateTable
CREATE TABLE "User" (
    "accountNum" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "walletBalance" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("accountNum")
);

-- CreateTable
CREATE TABLE "BankTransactions" (
    "bankTxnIdByBank" INTEGER NOT NULL,
    "accountNum" INTEGER NOT NULL,
    "type" "TxnType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankTransactions_pkey" PRIMARY KEY ("bankTxnIdByBank")
);

-- CreateTable
CREATE TABLE "PeerToPeerTxns" (
    "txnId" INTEGER NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PeerToPeerTxns_pkey" PRIMARY KEY ("txnId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_accountNum_key" ON "User"("accountNum");

-- AddForeignKey
ALTER TABLE "BankTransactions" ADD CONSTRAINT "BankTransactions_accountNum_fkey" FOREIGN KEY ("accountNum") REFERENCES "User"("accountNum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerToPeerTxns" ADD CONSTRAINT "PeerToPeerTxns_from_fkey" FOREIGN KEY ("from") REFERENCES "User"("accountNum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerToPeerTxns" ADD CONSTRAINT "PeerToPeerTxns_to_fkey" FOREIGN KEY ("to") REFERENCES "User"("accountNum") ON DELETE RESTRICT ON UPDATE CASCADE;
