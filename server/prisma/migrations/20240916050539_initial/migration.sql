/*
  Warnings:

  - Added the required column `avatarId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatarId` INTEGER NOT NULL,
    MODIFY `phonenumber` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `avatar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_avatarId_fkey` FOREIGN KEY (`avatarId`) REFERENCES `avatar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
