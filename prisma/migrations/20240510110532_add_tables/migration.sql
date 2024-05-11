/*
  Warnings:

  - Made the column `image_url` on table `language` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "language" ALTER COLUMN "image_url" SET NOT NULL;
