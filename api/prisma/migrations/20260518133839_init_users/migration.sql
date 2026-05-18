-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `openId` VARCHAR(64) NOT NULL,
    `nickname` VARCHAR(100) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `username` VARCHAR(100) NULL,
    `sex` VARCHAR(20) NULL,
    `grade` VARCHAR(50) NULL,
    `college` VARCHAR(100) NULL,
    `subCollege` VARCHAR(100) NULL,
    `major` VARCHAR(100) NULL,
    `isNewUser` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_openId_key`(`openId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
