-- CreateTable
CREATE TABLE "shipment" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "address" VARCHAR NOT NULL,
    "region" VARCHAR NOT NULL,
    "district" VARCHAR NOT NULL,
    "zip_code" VARCHAR,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" UUID NOT NULL,

    CONSTRAINT "shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_price" INTEGER NOT NULL,
    "customer_id" UUID NOT NULL,
    "shipment_id" UUID NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "order_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shipment" ADD CONSTRAINT "shipment_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
