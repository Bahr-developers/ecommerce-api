-- AlterTable
ALTER TABLE "order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "shipment" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';
