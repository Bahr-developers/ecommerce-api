-- CreateEnum
CREATE TYPE "Role" AS ENUM ('super_admin', 'user');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "status" "Role" NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "user_device" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "app_id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "model" VARCHAR NOT NULL,
    "version" VARCHAR NOT NULL,
    "ip" VARCHAR,
    "refresh_token" VARCHAR NOT NULL,
    "access_token" VARCHAR NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_device_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_device" ADD CONSTRAINT "user_device_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
