-- CreateTable
CREATE TABLE "permission" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" VARCHAR NOT NULL,
    "model_id" UUID NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "permission" ADD CONSTRAINT "permission_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
