/*
  Warnings:

  - You are about to drop the column `description` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `events` table. All the data in the column will be lost.
  - Added the required column `end` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "description",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "end" TIMESTAMP NOT NULL,
ADD COLUMN     "start" TIMESTAMP NOT NULL;
