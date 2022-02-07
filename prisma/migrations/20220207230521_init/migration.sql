-- CreateTable
CREATE TABLE `Player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Player_username_key`(`username`),
    UNIQUE INDEX `Player_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `gold` INTEGER NOT NULL,
    `supply` INTEGER NOT NULL,
    `level` DOUBLE NOT NULL,

    UNIQUE INDEX `Clan_name_key`(`name`),
    UNIQUE INDEX `Clan_slug_key`(`slug`),
    UNIQUE INDEX `Clan_owner_id_key`(`owner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `id` INTEGER NOT NULL,
    `clan_id` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `hired_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `state` INTEGER NOT NULL DEFAULT 0,
    `revenue` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clan` ADD CONSTRAINT `Clan_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_clan_id_fkey` FOREIGN KEY (`clan_id`) REFERENCES `Clan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
