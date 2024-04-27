-- CreateTable
CREATE TABLE "product" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "title" UUID NOT NULL,
    "description" UUID NOT NULL,
    "price" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "category_id" UUID NOT NULL,
    "image_url" VARCHAR[],
    "video_url" VARCHAR,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
