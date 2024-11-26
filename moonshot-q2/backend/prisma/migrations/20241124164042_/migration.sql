/*
  Warnings:

  - Changed the type of `a` on the `Dataset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `b` on the `Dataset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `c` on the `Dataset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `d` on the `Dataset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `e` on the `Dataset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `f` on the `Dataset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Dataset" DROP COLUMN "a",
ADD COLUMN     "a" INTEGER NOT NULL,
DROP COLUMN "b",
ADD COLUMN     "b" INTEGER NOT NULL,
DROP COLUMN "c",
ADD COLUMN     "c" INTEGER NOT NULL,
DROP COLUMN "d",
ADD COLUMN     "d" INTEGER NOT NULL,
DROP COLUMN "e",
ADD COLUMN     "e" INTEGER NOT NULL,
DROP COLUMN "f",
ADD COLUMN     "f" INTEGER NOT NULL;
