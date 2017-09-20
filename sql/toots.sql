CREATE TABLE `toots`(
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  `user_id` int(11) NOT NULL,
  `body` TEXT,
  `image_id` int(11) NULL ,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


