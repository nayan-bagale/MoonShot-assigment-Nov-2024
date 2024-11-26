/*
  Warnings:

  - You are about to drop the column `A` on the `Dataset` table. All the data in the column will be lost.
  - You are about to drop the column `B` on the `Dataset` table. All the data in the column will be lost.
  - You are about to drop the column `C` on the `Dataset` table. All the data in the column will be lost.
  - You are about to drop the column `D` on the `Dataset` table. All the data in the column will be lost.
  - You are about to drop the column `E` on the `Dataset` table. All the data in the column will be lost.
  - You are about to drop the column `F` on the `Dataset` table. All the data in the column will be lost.
  - Added the required column `a` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `c` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `d` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `e` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `f` to the `Dataset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dataset" DROP COLUMN "A",
DROP COLUMN "B",
DROP COLUMN "C",
DROP COLUMN "D",
DROP COLUMN "E",
DROP COLUMN "F",
ADD COLUMN     "a" TEXT NOT NULL,
ADD COLUMN     "b" TEXT NOT NULL,
ADD COLUMN     "c" TEXT NOT NULL,
ADD COLUMN     "d" TEXT NOT NULL,
ADD COLUMN     "e" TEXT NOT NULL,
ADD COLUMN     "f" TEXT NOT NULL;
