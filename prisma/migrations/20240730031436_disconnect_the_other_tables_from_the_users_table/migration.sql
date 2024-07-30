/*
  Warnings:

  - You are about to drop the column `user_id` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `investments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `invoices` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_user_id_fkey";

-- DropForeignKey
ALTER TABLE "investments" DROP CONSTRAINT "investments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_user_id_fkey";

-- AlterTable
ALTER TABLE "goals" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "investments" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "user_id";
