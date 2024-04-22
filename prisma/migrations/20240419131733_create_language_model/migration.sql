-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "translate_type" AS ENUM ('error', 'content');

-- CreateTable
CREATE TABLE "language" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "code" VARCHAR(2) NOT NULL,
    "title" VARCHAR(64) NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translate" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "code" VARCHAR NOT NULL,
    "type" "translate_type" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'inactive',

    CONSTRAINT "translate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "definition" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "translate_id" UUID NOT NULL,
    "language_id" UUID NOT NULL,
    "value" VARCHAR NOT NULL,

    CONSTRAINT "definition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "language_code_key" ON "language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "translate_code_key" ON "translate"("code");

-- AddForeignKey
ALTER TABLE "definition" ADD CONSTRAINT "definition_translate_id_fkey" FOREIGN KEY ("translate_id") REFERENCES "translate"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "definition" ADD CONSTRAINT "definition_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
