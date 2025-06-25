/*
  Warnings:

  - You are about to drop the `SharedExpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedExpenseGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedExpenseParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SharedExpense" DROP CONSTRAINT "SharedExpense_groupId_fkey";

-- DropForeignKey
ALTER TABLE "SharedExpense" DROP CONSTRAINT "SharedExpense_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedExpenseGroup" DROP CONSTRAINT "SharedExpenseGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedExpenseParticipant" DROP CONSTRAINT "SharedExpenseParticipant_expenseId_fkey";

-- DropTable
DROP TABLE "SharedExpense";

-- DropTable
DROP TABLE "SharedExpenseGroup";

-- DropTable
DROP TABLE "SharedExpenseParticipant";
