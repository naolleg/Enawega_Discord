-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_avatarId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `avatarId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_avatarId_fkey` FOREIGN KEY (`avatarId`) REFERENCES `avatar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
