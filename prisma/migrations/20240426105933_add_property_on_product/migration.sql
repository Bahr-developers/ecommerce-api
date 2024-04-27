/*
  Warnings:

  - Added the required column `value` to the `properties_on_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties_on_product" ADD COLUMN     "value" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "properties_on_product" ADD CONSTRAINT "properties_on_product_value_fkey" FOREIGN KEY ("value") REFERENCES "translate"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
