/*
  Warnings:

  - Changed the type of `day` on the `Dataset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Dataset" DROP COLUMN "day",
ADD COLUMN     "day" TIMESTAMP(3) NOT NULL;
