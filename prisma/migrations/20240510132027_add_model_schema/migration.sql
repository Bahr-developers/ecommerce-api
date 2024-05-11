-- CreateTable
CREATE TABLE "model" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" VARCHAR NOT NULL,

    CONSTRAINT "model_pkey" PRIMARY KEY ("id")
);
