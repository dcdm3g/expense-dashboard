/*
  Warnings:

  - Added the required column `balance` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "balance" DECIMAL(19,4) NOT NULL;