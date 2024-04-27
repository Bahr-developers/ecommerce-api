-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" UUID NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties_on_product" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "productId" UUID NOT NULL,
    "propertiesId" UUID NOT NULL,

    CONSTRAINT "properties_on_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_name_fkey" FOREIGN KEY ("name") REFERENCES "translate"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "properties_on_product" ADD CONSTRAINT "properties_on_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "properties_on_product" ADD CONSTRAINT "properties_on_product_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
