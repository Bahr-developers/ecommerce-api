-- CreateTable
CREATE TABLE "sms" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "sms_code" VARCHAR,
    "sms_time" VARCHAR,
    "user_id" UUID NOT NULL,

    CONSTRAINT "sms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sms" ADD CONSTRAINT "sms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
