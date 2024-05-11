/*
  Warnings:

  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role_Type" AS ENUM ('super_admin', 'admin', 'user');

-- AlterTable
ALTER TABLE "translate" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "status",
ADD COLUMN     "role_type" "Role_Type" NOT NULL DEFAULT 'user';

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" VARCHAR NOT NULL,
    "permissions" UUID[],
    "role_type" "Role_Type" NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnRole" (
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" UUID NOT NULL,

    CONSTRAINT "UserOnRole_pkey" PRIMARY KEY ("user_id","role_id")
);

-- AddForeignKey
ALTER TABLE "UserOnRole" ADD CONSTRAINT "UserOnRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnRole" ADD CONSTRAINT "UserOnRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
