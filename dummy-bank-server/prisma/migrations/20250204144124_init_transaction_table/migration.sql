/*
  Warnings:

  - You are about to drop the column `Name` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TxnStatus" AS ENUM ('success', 'failed', 'pending');

-- CreateEnum
CREATE TYPE "TxnType" AS ENUM ('credit', 'debit');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Name",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Transactions" (
    "txnId" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "status" "TxnStatus" NOT NULL DEFAULT 'pending',
    "ammount" INTEGER NOT NULL,
    "type" "TxnType" NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("txnId")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "User"("accountNum") ON DELETE RESTRICT ON UPDATE CASCADE;
