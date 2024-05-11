/*
  Warnings:

  - Added the required column `code` to the `permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permission" ADD COLUMN     "code" VARCHAR NOT NULL;
