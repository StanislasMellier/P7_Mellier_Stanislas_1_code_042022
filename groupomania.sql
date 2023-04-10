CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(50) UNIQUE PRIMARY KEY NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `profilePicUrl` varchar(255) DEFAULT "default-profile.jpg",
  `isAdmin` boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS `posts` (
  `id` varchar(50) UNIQUE PRIMARY KEY NOT NULL,
  `createdBy` varchar(50),
  `createdAt` datetime NOT NULL DEFAULT (now()),
  `title` text NOT NULL,
  `description` text,
  `imageUrl` varchar(100)
);

CREATE TABLE IF NOT EXISTS `answers` (
  `id` varchar(50) UNIQUE PRIMARY KEY NOT NULL,
  `postId` varchar(50) NOT NULL,
  `createdBy` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT (now()),
  `content` text NOT NULL
);

ALTER TABLE `posts` ADD FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `answers` ADD FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `answers` ADD FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
