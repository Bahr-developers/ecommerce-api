-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_name_fkey";

-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_name_fkey";

-- DropForeignKey
ALTER TABLE "properties_on_product" DROP CONSTRAINT "properties_on_product_value_fkey";
