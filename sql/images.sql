CREATE TABLE `images`(
  `image_id` int(11) AUTO_INCREMENT NOT NULL  PRIMARY KEY,
  `data` LONGBLOB NOT NULL,
  `filename` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(255) NOT NULL
);


