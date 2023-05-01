SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` int(8) NOT NULL,
  `email` varchar(100) NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `owners` (`firstName`, `lastName`, `address`, `phone`, `email`, `age`) VALUES
('Oliver', 'Smith', '34 Cook Street', 71838750, 'olism@gmail.com', 34),
('John', 'Karev', '12 Main Street', 71838751, 'johnykav@yahoo.com', 40),
('Mary', 'Grey', '23 Park Avenue', 71838752, 'marygrey@gmail.com', 34),
('Meredith', 'Grey', '34 Cook Street', 71838753, 'mergrey@gmail.com', 16),
('Alex', 'Karev', '12 Main Street', 71838754, 'karev@yahoo.com', 89),
('Jose', 'Wilson', '23 Park Avenue', 71838755, 'jo@yahoo.com', 35),
('Richard', 'Webber', '34 Cook Street', 71838756, 'rich@yahoo.com', 89),
('Jackson', 'Avery', '12 Main Street', 71838757, 'jack@gmail.com', 34),
('April', 'Kepner', '23 Park Avenue', 71838758, 'april@yahoo.com', 16),
('Callie', 'Torres', '34 Cook Street', 71838759, 'callie@gmail.com', 89),
('Tiberiu', 'Craiu', '12 Motilor', 70888726, 'tibi@gmail.com', 22);

CREATE TABLE `cats` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `color` varchar(20) NOT NULL,
  `breed` varchar(50) NOT NULL,
  `weight` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `ownerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `cats` (`name`, `age`, `color`, `breed`, `weight`, `ownerId`, `description`) VALUES
('Mittens', 3, 'white', 'Persian', 10, 1, 'Mittens is a cute and cuddly cat with a playful personality.'),
('Fluffy', 4, 'black', 'Bombay', 8, 10, 'Fluffy is a mischievous cat with a love for adventure.'),
('Patches', 2, 'brown', 'Tabby', 6, 3, 'Patches is a friendly cat who loves attention and cuddles.'),
('Zoe', 1, 'white', 'Khao Manee', 3, 10, 'Zoe is a curious cat who loves exploring her surroundings.'),
('Misty', 5, 'black', 'Siamese', 9, 2, 'Misty is a graceful cat with a quiet and calm demeanor.'),
('Smokey', 2, 'brown', 'Tabby', 6, 9, 'Smokey is a playful cat who loves chasing toys and cuddling.'),
('Tiger', 3, 'white', 'Persian', 10, 1, 'Tiger is a majestic cat with a regal presence and a friendly demeanor.'),
('Shadow', 4, 'black', 'Bombay', 8, 4, 'Shadow is a mysterious cat with a quiet and watchful nature.'),
('Oreo', 2, 'brown', 'Tabby', 6, 4, 'Oreo is a sweet cat who loves snuggles and treats.'),
('Socks', 1, 'white', 'Khao Manee', 3, 8, 'Socks is a playful and energetic cat who loves to play and explore.'),
('Snowball', 5, 'black', 'Siamese', 9, 5, 'Snowball is a curious and adventurous cat who loves to explore and discover new things.'),
('Salem', 2, 'brown', 'Tabby', 6, 6, 'Salem is a mischievous and playful cat who loves to get into trouble and have fun.'),
('Sylvester', 3, 'white', 'Persian', 10, 7, 'Sylvester is a lovable and cuddly cat who loves to be around people and receive affection.'),
('Garfield', 4, 'black', 'Bombay', 8, 9, 'Garfield is a lazy cat who loves to sleep and eat.'),
('Tom', 2, 'brown', 'Tabby', 6, 9, 'Tom is a friendly cat who loves to play and cuddle with his human companions.'),
('Pixie', 2, 'black', 'common', 4, 11, 'Pixie is a cute and playful cat who loves to run and play.'),
('Benga', 1, 'gray', 'common', 6, 11, 'Benga is a sweet and friendly cat who loves to cuddle and be petted.');

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `foods` (`name`, `brand`, `price`, `quantity`, `type`) VALUES
('Purina Pro Plan', 'Purina', 50, 15, 'dry'),
('Whiskas Chicken Flavour', 'Purina', 90, 10, 'dry'),
('Royal Canin Kitten', 'Royal Canin', 100, 20, 'dry'),
('Aatas Cat Ocean Delight Salmon', 'Aatas', 70, 15, 'dry'),
('ProDiet Chicken & Tuna', 'ProDiet', 80, 10, 'dry'),
('Kit Cat Wild Caught Tuna & Chicken', 'Kit Cat', 100, 15, 'wet'),
('Whiskas Poultry Selection', 'Purina', 90, 10, 'wet'),
('Purina Friskies Pate', 'Purina', 100, 20, 'wet'),
('Aatas Cat Ocean Delight Chicken', 'Aatas', 70, 15, 'wet'),
('Feline Gourmet Chicken & Tuna', 'ProDiet', 80, 10, 'wet');

CREATE TABLE `foods_for_cats` (
  `id` int(11) NOT NULL,
  `catId` int(11) NOT NULL,
  `foodId` int(11) NOT NULL,
  `purchased` date NOT NULL,
  `place` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `foods_for_cats` (`catId`, `foodId`, `purchased`, `place`) VALUES
(2, 5, '2019-01-01', 'Washington'),
(2, 10, '2020-02-02', 'Los Angeles'),
(2, 8, '2021-03-03', 'Chicago'),
(3, 2, '2022-03-04', 'Houston'),
(3, 5, '2023-03-04', 'Philadelphia'),
(5, 3, '2022-03-04', 'Phoenix'),
(4, 3, '2023-04-04', 'San Antonio'),
(6, 4, '2021-04-30', 'San Diego'),
(8, 4, '2020-07-12', 'Dallas'),
(8, 5, '2018-11-07', 'San Jose'),
(7, 6, '2023-12-15', 'Austin'),
(6, 7, '2012-02-15', 'Jacksonville'),
(8, 8, '2015-12-15', 'San Francisco'),
(9, 9, '2019-02-14', 'Indianapolis'),
(10, 10, '2010-07-19', 'Columbus'),
(10, 10, '2020-09-05', 'Charlotte'),
(11, 9, '2021-08-08', 'Fort Worth'),
(12, 8, '2022-04-03', 'Detroit'),
(13, 4, '2022-03-02', 'El Paso'),
(14, 5, '2023-05-01', 'Memphis'),
(15, 6, '2023-06-11', 'Boston'),
(15, 7, '2023-07-18', 'Seattle')

ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`id`),
  ADD UNIQUE KEY `email` (`id`);

ALTER TABLE `cats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_CatOwner` (`ownerId`);

ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `foods_for_cats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_food` (`foodId`),
  ADD KEY `fk_cat` (`catId`);

ALTER TABLE `cats`
  ADD CONSTRAINT `FK_CatOwner` FOREIGN KEY (`ownerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `foods_for_cats`
  ADD CONSTRAINT `fk_cat` FOREIGN KEY (`catId`) REFERENCES `cats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_food` FOREIGN KEY (`foodId`) REFERENCES `foods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
