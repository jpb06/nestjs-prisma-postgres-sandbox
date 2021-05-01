/*
  Warnings:

  - You are about to drop the column `fistName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fistName",
ADD COLUMN     "firstName" TEXT;
