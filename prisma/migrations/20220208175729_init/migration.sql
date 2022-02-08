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
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clan_id` INTEGER NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `type` INTEGER NOT NULL,
    `hired_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `state` INTEGER NOT NULL DEFAULT 0,
    `life_status` BOOLEAN NOT NULL DEFAULT true,
    `revenue` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Miner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `start_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Miner_member_id_key`(`member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Explorer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `expedition_id` INTEGER NOT NULL,

    UNIQUE INDEX `Explorer_member_id_key`(`member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expedition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(20) NOT NULL,
    `difficulty` INTEGER NOT NULL,
    `min_req` INTEGER NOT NULL,
    `chance` INTEGER NOT NULL,
    `loot` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberTypeTranslation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `translation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberStateTranslation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `translation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clan` ADD CONSTRAINT `Clan_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_clan_id_fkey` FOREIGN KEY (`clan_id`) REFERENCES `Clan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Miner` ADD CONSTRAINT `Miner_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Explorer` ADD CONSTRAINT `Explorer_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Explorer` ADD CONSTRAINT `Explorer_expedition_id_fkey` FOREIGN KEY (`expedition_id`) REFERENCES `Expedition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
