-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: samurai-metaverse-prod-mysql-do-user-18016958-0.k.db.ondigitalocean.com:25060
-- Generation Time: Sep 19, 2025 at 06:55 PM
-- Server version: 8.0.35
-- PHP Version: 8.1.2-1ubuntu2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `metaverse`
--

-- --------------------------------------------------------

--
-- Table structure for table `m_avatars`
--

CREATE TABLE `m_avatars` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` enum('0','1','2') NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `m_avatars`
--

INSERT INTO `m_avatars` (`id`, `name`, `gender`, `avatar_url`, `created_at`, `updated_at`) VALUES
(1, 'Body 1', '1', 'models/avatars/avatar1.glb', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(2, 'Body 2', '1', 'models/avatars/avatar2.glb', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(3, 'Body 3', '1', 'models/avatars/avatar3.glb', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(4, 'Body 4', '1', 'models/avatars/avatar4.glb', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(5, 'Body 5', '1', 'models/avatars/avatar5.glb', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(6, 'Body 6', '2', 'models/avatars/avatar6.glb', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(7, 'Body 7', '2', 'models/avatars/avatar7.glb', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(8, 'Body 8', '2', 'models/avatars/avatar8.glb', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(9, 'Body 9', '2', 'models/avatars/avatar9.glb', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(10, 'Body 10', '2', 'models/avatars/avatar10.glb', '2025-02-18 09:44:34', '2025-02-18 09:44:34');

-- --------------------------------------------------------

--
-- Table structure for table `m_items`
--

CREATE TABLE `m_items` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `gender` enum('0','1','2') NOT NULL,
  `type` enum('body','mask','glove','hat','shoe','horse','bow') NOT NULL,
  `parts_hided` varchar(255) NOT NULL,
  `stat_jump` int NOT NULL DEFAULT '0',
  `stat_move` int NOT NULL DEFAULT '0',
  `pattern` enum('default','item') NOT NULL DEFAULT 'default',
  `set_number` int NOT NULL DEFAULT '0',
  `owner` varchar(255) NOT NULL DEFAULT 'system',
  `is_selling` tinyint(1) NOT NULL DEFAULT '0',
  `chain_id` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `m_items`
--

INSERT INTO `m_items` (`id`, `name`, `link`, `thumbnail`, `gender`, `type`, `parts_hided`, `stat_jump`, `stat_move`, `pattern`, `set_number`, `owner`, `is_selling`, `chain_id`, `created_at`, `updated_at`) VALUES
(1, 'Hat 1', 'models/items/Set1_Hat.glb', 'models/items/thumb/Set1_Hat.png', '1', 'hat', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(2, 'Hat 2', 'models/items/Set2_Hat.glb', 'models/items/thumb/Set2_Hat.png', '1', 'hat', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(3, 'Hat 3', 'models/items/Set3_Hat.glb', 'models/items/thumb/Set3_Hat.png', '1', 'hat', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(4, 'Samurai Hair 4', 'models/items/Set4_Hat.glb', 'models/items/thumb/Set4_Hat.png', '1', 'hat', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(5, 'Samurai Hair 5', 'models/items/Set5_Hat.glb', 'models/items/thumb/Set5_Hat.png', '2', 'hat', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(6, 'Mask 1', 'models/items/Set1_Mask.glb', 'models/items/thumb/Set1_Mask.png', '1', 'mask', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(7, 'Mask 2', 'models/items/Set2_Mask.glb', 'models/items/thumb/Set2_Mask.png', '1', 'mask', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(8, 'Mask 3', 'models/items/Set3_Mask.glb', 'models/items/thumb/Set3_Mask.png', '1', 'mask', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(9, 'Shoe 1', 'models/items/Set1_Shoe.glb', 'models/items/thumb/Set1_Shoe.png', '1', 'shoe', 'Foot', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(10, 'Shoe 2', 'models/items/Set2_Shoe.glb', 'models/items/thumb/Set2_Shoe.png', '1', 'shoe', 'Foot', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(11, 'Shoe 3', 'models/items/Set3_Shoe.glb', 'models/items/thumb/Set3_Shoe.png', '1', 'shoe', 'Foot', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(12, 'Glove 1', 'models/items/Set1_Glove.glb', 'models/items/thumb/Set1_Glove.png', '1', 'glove', 'Hand', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(13, 'Glove 2', 'models/items/Set2_Glove.glb', 'models/items/thumb/Set2_Glove.png', '1', 'glove', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(14, 'Glove 3', 'models/items/Set3_Glove.glb', 'models/items/thumb/Set3_Glove.png', '1', 'glove', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(15, 'Body 1', 'models/items/Set1_Body.glb', 'models/items/thumb/Set1_Body.png', '0', 'body', 'Body Arm Leg', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(16, 'Body 2', 'models/items/Set2_Body.glb', 'models/items/thumb/Set2_Body.png', '1', 'body', 'Body Arm Leg', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(17, 'Body 3', 'models/items/Set3_Body.glb', 'models/items/thumb/Set3_Body.png', '1', 'body', 'Body Arm Leg', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(18, 'Horse 1', 'models/items/Set1_Horse.glb', 'models/items/thumb/Set1_Horse.png', '0', 'horse', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(19, 'Bow 0', 'models/items/Set2_Bow.glb', 'models/items/thumb/Set2_Bow.png', '0', 'bow', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(20, 'Princess bodyguard Hat', 'models/items/Set8_Hat.glb', 'models/items/thumb/Set8_Hat.png', '2', 'hat', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
(21, 'Princess bodyguard Mask', 'models/items/Set8_Mask.glb', 'models/items/thumb/Set8_Mask.png', '2', 'mask', '', 0, 0, 'default', 0, 'rayhaan', 0, NULL, '2025-02-18 09:44:34', '2025-02-18 09:44:34'),


-- --------------------------------------------------------

--
-- Table structure for table `m_nft_types`
--

CREATE TABLE `m_nft_types` (
  `token_address` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `chain_id` varchar(255) NOT NULL,
  `symbol` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `m_nft_types`
--

INSERT INTO `m_nft_types` (`token_address`, `name`, `chain_id`, `symbol`, `created_at`, `updated_at`) VALUES
('0x7284ceb941a6c6889d99c92f21238a89cfa932d5', 'CMC Virtual Items', '17000', 'cItems', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
('0xb11f419276d2120f558de47157e1841a64363c5e', 'CMC Virtual Lands', '17000', 'cLands', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
('0xb5a6af64439b302ad28d480b8819ca922b8e31de', 'CMC Virtual Lands', '97', 'cLands', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
('0xe27159d81679bcc60a33d2578338e096db6dc428', 'CMC Virtual Items', '97', 'cItems', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
('0xe81bd02c9407cf4b624f339db78ca221992341c9', 'CMC Virtual Homes', '97', 'cHomes', '2025-02-18 09:44:34', '2025-02-18 09:44:34'),
('0xf85128220f11144faa8d3335cee7c00250da007e', 'CMC Virtual Homes', '17000', 'cHomes', '2025-02-18 09:44:34', '2025-02-18 09:44:34');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20230209064900-create-t_users-table-migration.js'),
('20230221035603-alter-t_users-table-migration.js'),
('20230323061034-create-m_avatars-table-migration.js'),
('20230323063001-add-column-t_users-table-migration.js'),
('20230323075639-create-m_items-table-migration.js'),
('20230323081019-create-t_user-items-table-migration.js'),
('20230328060855-create-m_nfts_types-table-migration.js'),
('20230328062418-create-t_nfts-table-migration.js'),
('20230329044621-create-t_metainfos-table-migration.js'),


-- --------------------------------------------------------

--
-- Table structure for table `t_home-lands`
--

CREATE TABLE `t_home-lands` (
  `id` int NOT NULL,
  `home_id` int NOT NULL,
  `land_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `t_home-lands`
--

INSERT INTO `t_home-lands` (`id`, `home_id`, `land_id`, `created_at`, `updated_at`) VALUES
(2, 5024, 2857, '2025-02-20 07:36:51', '2025-02-20 07:36:51'),
(11, 4752, 2267, '2025-02-21 08:06:31', '2025-02-21 08:06:31'),
(12, 4140, 2042, '2025-02-21 08:07:50', '2025-02-21 08:07:50'),
(13, 5031, 3000, '2025-02-21 08:08:14', '2025-02-21 08:08:14'),
(15, 5806, 3528, '2025-02-23 04:14:51', '2025-02-23 04:14:51'),
(16, 5972, 3532, '2025-02-24 02:15:06', '2025-02-24 02:15:06'),
(17, 4659, 2269, '2025-02-25 05:15:29', '2025-02-25 05:15:29'),
(18, 4662, 2276, '2025-02-25 05:15:44', '2025-02-25 05:15:44'),
(19, 4674, 2270, '2025-02-25 05:15:56', '2025-02-25 05:15:56'),
(20, 4684, 2711, '2025-02-25 05:16:07', '2025-02-25 05:16:07'),


-- --------------------------------------------------------

--
-- Table structure for table `t_mat-stores`
--

CREATE TABLE `t_mat-stores` (
  `id` int NOT NULL,
  `mat_id` int NOT NULL,
  `selling_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `t_mat-stores`
--

INSERT INTO `t_mat-stores` (`id`, `mat_id`, `selling_id`, `created_at`, `updated_at`) VALUES
(1, 5029, 140, '2025-03-03 02:05:49', '2025-03-03 02:05:49'),
(2, 5029, 145, '2025-03-03 02:05:49', '2025-03-03 02:05:49'),
(3, 6053, 143, '2025-03-03 02:06:14', '2025-03-03 02:06:14'),
(4, 6053, 144, '2025-03-03 02:06:14', '2025-03-03 02:06:14'),
(5, 6053, 147, '2025-03-03 02:06:14', '2025-03-03 02:06:14'),
(6, 6053, 150, '2025-03-03 02:06:14', '2025-03-03 02:06:14'),
(7, 5036, 138, '2025-03-03 02:07:01', '2025-03-03 02:07:01'),
(8, 5036, 139, '2025-03-03 02:07:01', '2025-03-03 02:07:01');

-- --------------------------------------------------------

--
-- Table structure for table `t_meta_infos`
--

CREATE TABLE `t_meta_infos` (
  `id` int NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `t_meta_infos`
--

INSERT INTO `t_meta_infos` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'latestBlock_BSC', '48748279', '2025-02-18 09:44:34', '2025-03-03 02:05:01'),
(2, 'latestBlock_Mumbai', '3415516', '2025-02-18 09:44:34', '2025-02-24 06:24:30');

-- --------------------------------------------------------

--
-- Table structure for table `t_nfts`
--

CREATE TABLE `t_nfts` (
  `id` int NOT NULL,
  `token_address` varchar(255) NOT NULL,
  `token_id` int NOT NULL,
  `chain_id` varchar(255) NOT NULL,
  `token_uri` varchar(255) NOT NULL,
  `metadata` text,
  `owner` varchar(255) NOT NULL,
  `is_sync_metadata` tinyint(1) DEFAULT '0',
  `created_at` bigint DEFAULT NULL,
  `last_sync` bigint DEFAULT NULL,
  `is_for_rent` tinyint(1) NOT NULL DEFAULT '0',
  `rent_price` varchar(255) DEFAULT NULL,
  `rent_period_days` int DEFAULT NULL,
  `tenant_wallet` varchar(255) DEFAULT NULL,
  `rent_due_at` bigint DEFAULT NULL,
  `grace_until` bigint DEFAULT NULL,
  `rental_status` enum('listed','active','late','evicted','ended') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `t_nfts`
--

INSERT INTO `t_nfts` (`id`, `token_address`, `token_id`, `chain_id`, `token_uri`, `metadata`, `owner`, `is_sync_metadata`, `created_at`, `last_sync`, `is_for_rent`, `rent_price`, `rent_period_days`, `tenant_wallet`, `rent_due_at`, `grace_until`, `rental_status`) VALUES
(2042, '0xb5a6af64439b302ad28d480b8819ca922b8e31de', 0, '97', 'ipfs://QmYWvcPoupqhiqUzuPorLjQprz9UsPRBs5EpgyePT8knYK/metadata/cLands/cLand0.json', '{\"image\":\"https://api-meta.samuraimetaverse.io/public/nft/images/land/img/human.jpg\",\"name\":\"Land Human 0\",\"description\":\"\",\"external_url\":\"\",\"thumbnail\":\"https://api-meta.samuraimetaverse.io/public/nft/images/land/thumbnail/human.jpg\",\"objectId\":\"cLands_0\",\"tokenId\":0,\"attributes\":[{\"trait_type\":\"Longtitude\",\"value\":\"-28.123208\"},{\"trait_type\":\"Latitude\",\"value\":\"-11.476176\"},{\"trait_type\":\"Area\",\"value\":\"322.74688469260803\"},{\"trait_type\":\"Type\",\"value\":\"Human\"}]}', 'modi narendra', 1, 33155822, 33155822, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(2043, '0xb5a6af64439b302ad28d480b8819ca922b8e31de', 1, '97', 'ipfs://QmYWvcPoupqhiqUzuPorLjQprz9UsPRBs5EpgyePT8knYK/metadata/cLands/cLand1.json', '{\"image\":\"https://api-meta.samuraimetaverse.io/public/nft/images/land/img/human.jpg\",\"name\":\"Land Human 1\",\"description\":\"\",\"external_url\":\"\",\"thumbnail\":\"https://api-meta.samuraimetaverse.io/public/nft/images/land/thumbnail/human.jpg\",\"objectId\":\"cLands_1\",\"tokenId\":1,\"attributes\":[{\"trait_type\":\"Longtitude\",\"value\":\"119.758990\"},{\"trait_type\":\"Latitude\",\"value\":\"-85.870664\"},{\"trait_type\":\"Area\",\"value\":\"10283.78399126936\"},{\"trait_type\":\"Type\",\"value\":\"Human\"}]}', '0xmasudamuts000000000000000000000000000000', 1, 33155822, 33155822, 0, NULL, NULL, NULL, NULL, NULL, NULL),


-----------------------------------------------------

--
-- Table structure for table `t_selling_nfts`
--

CREATE TABLE `t_selling_nfts` (
  `id` int NOT NULL,
  `listing_id` int NOT NULL,
  `chain_id` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `selling_type` int NOT NULL,
  `start_time` int NOT NULL,
  `end_time` int NOT NULL,
  `last_sync` bigint NOT NULL,
  `is_closed` tinyint(1) DEFAULT '0',
  `buyer` varchar(255) DEFAULT NULL,
  `seller` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `nft_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `t_selling_nfts`
--

INSERT INTO `t_selling_nfts` (`id`, `listing_id`, `chain_id`, `price`, `selling_type`, `start_time`, `end_time`, `last_sync`, `is_closed`, `buyer`, `seller`, `key`, `nft_id`) VALUES
(50, 0, '97', '94000000000000000000', 0, 1694577227, 1726134153, 33293453, 0, NULL, '0x11070a002ef20d50ef914ce569f06574048667ca', '940xe27159d81679bcc60a33d2578338e096db6dc428', 4136),
(51, 1, '97', '93000000000000000000', 0, 1694577236, 1726134162, 33293456, 0, NULL, '0x11070a002ef20d50ef914ce569f06574048667ca', '930xe27159d81679bcc60a33d2578338e096db6dc428', 4135),
(52, 11, '97', '78000000000000000000', 0, 1694577335, 1726134261, 33293489, 0, NULL, '0x11070a002ef20d50ef914ce569f06574048667ca', '780xe27159d81679bcc60a33d2578338e096db6dc428', 4118),
(53, 10, '97', '79000000000000000000', 0, 1694577326, 1726134252, 33293486, 0, NULL, '0x11070a002ef20d50ef914ce569f06574048667ca', '790xe27159d81679bcc60a33d2578338e096db6dc428', 4119),


-- --------------------------------------------------------

--
-- Table structure for table `t_user-items`
--

CREATE TABLE `t_user-items` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `t_user-items`
--

INSERT INTO `t_user-items` (`id`, `user_id`, `item_id`, `created_at`, `updated_at`) VALUES
(7, 3, 17, '2025-02-19 02:04:41', '2025-02-19 02:04:41'),
(8, 3, 3, '2025-02-19 02:04:41', '2025-02-19 02:04:41'),
(9, 3, 7, '2025-02-19 02:04:41', '2025-02-19 02:04:41'),
(10, 3, 11, '2025-02-19 02:04:41', '2025-02-19 02:04:41'),


-- --------------------------------------------------------

--
-- Table structure for table `t_user-wallets`
--

CREATE TABLE `t_user-wallets` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `wallet_address` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `t_user-wallets`
--

INSERT INTO `t_user-wallets` (`id`, `user_id`, `wallet_address`, `created_at`, `updated_at`) VALUES
(1, 5, '0x83d836426fb73a3271d598abb794b65b26f53f54', '2025-02-20 06:42:40', '2025-02-20 06:42:40'),
(2, 6, '0xb755e9fbb1ad5c9459cf0219561c601d1027fb15', '2025-02-20 06:55:08', '2025-02-20 06:55:08'),
(3, 7, '0x11070a002ef20d50ef914ce569f06574048667ca', '2025-02-21 02:34:48', '2025-02-21 02:34:48'),
(4, 8, '0x73b9cec84fbd7eb898e90c6feeff828f48fbc13b', '2025-02-21 04:18:06', '2025-02-21 04:18:06'),
(5, 6, '0x3282d3899e1e6aa7bebb382fc1261f93b2ea8e46', '2025-02-21 06:21:42', '2025-02-21 06:21:42'),
(6, 13, '0xbe91bc10ab84d82522d922864dbd8bd05f5c141a', '2025-02-23 03:54:21', '2025-02-23 03:54:21'),

-- --------------------------------------------------------

--
-- Table structure for table `t_users`
--

CREATE TABLE `t_users` (
  `id` int NOT NULL,
  `wallet_address` varchar(255) DEFAULT NULL,
  `property_ids` text,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `previous_position` varchar(255) DEFAULT NULL,
  `last_position` varchar(255) DEFAULT NULL,
  `last_room` varchar(255) NOT NULL DEFAULT '0',
  `avatar_id` int DEFAULT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `forgot_code` varchar(255) DEFAULT NULL,
  `forgot_code_expire` datetime DEFAULT NULL,
  `last_password_modify_time` datetime DEFAULT NULL,
  `nonce` bigint DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nft_metadata` json DEFAULT (json_array())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `t_users`
--

INSERT INTO `t_users` (`id`, `wallet_address`, `property_ids`, `username`, `email`, `password`, `previous_position`, `last_position`, `last_room`, `avatar_id`, `last_login_time`, `forgot_code`, `forgot_code_expire`, `last_password_modify_time`, `nonce`, `created_at`, `updated_at`, `nft_metadata`) VALUES
(1, NULL, NULL, 'nqthanh2', 'nqthanh2@cmcglobal.vn', '$2a$10$jJM2jqUESGiFXQO7NqNUletPtqP5oDSt91lmBhvKc2isgIarMjTXu', '{\"position\":{\"x\":188.93636127470623,\"y\":34.54877471923828,\"z\":4.889124462044636},\"quaternion\":{\"x\":0,\"y\":-0.09287514178767006,\"z\":0,\"w\":0.9956777631532805}}', NULL, '0', 1, '2025-02-25 03:17:17', 'YZG2M', '2025-02-25 05:54:29', NULL, NULL, '2025-02-18 10:36:46', '2025-02-25 05:54:29', '[]'),
(2, '0xeB3AAfdb3674E4Ea9933109e851328e38B95A0Ac', NULL, 'hmhoang', 'hmhoang@yopmail.com', '$2a$10$/qwuErUYkhj0nsmmHyrRhuEXPHmh6jvye8PUrLAmP/6ZTY.yBlgVa', '{\"position\":{\"x\":216.67054731951364,\"y\":34.54877471923828,\"z\":-228.36591931622698},\"quaternion\":{\"x\":0,\"y\":0.9456516163851912,\"z\":0,\"w\":-0.32518151919823984}}', '{\"position\":{\"x\":0.23692574153961476,\"y\":-0.01657688617706299,\"z\":0.03513025222309518},\"quaternion\":{\"x\":0,\"y\":0.7051267175353828,\"z\":0,\"w\":0.7090813156597603}}', 'Store Scene 454', 1, '2025-02-25 05:13:22', NULL, NULL, NULL, 1740284162706, '2025-02-18 10:42:43', '2025-02-25 05:13:22', '[]'),

--
-- Indexes for dumped tables
--

--
-- Indexes for table `m_avatars`
--
ALTER TABLE `m_avatars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `m_items`
--
ALTER TABLE `m_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `m_nft_types`
--
ALTER TABLE `m_nft_types`
  ADD PRIMARY KEY (`token_address`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `t_home-lands`
--
ALTER TABLE `t_home-lands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `home_id` (`home_id`),
  ADD KEY `land_id` (`land_id`);

--
-- Indexes for table `t_mat-stores`
--
ALTER TABLE `t_mat-stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mat_id` (`mat_id`),
  ADD KEY `selling_id` (`selling_id`);

--
-- Indexes for table `t_meta_infos`
--
ALTER TABLE `t_meta_infos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_nfts`
--
ALTER TABLE `t_nfts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `token_address` (`token_address`);

--
-- Indexes for table `t_selling_nfts`
--
ALTER TABLE `t_selling_nfts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nft_id` (`nft_id`);

--
-- Indexes for table `t_user-items`
--
ALTER TABLE `t_user-items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `t_user-wallets`
--
ALTER TABLE `t_user-wallets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `wallet_address` (`wallet_address`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `t_users_avatar_id_foreign_idx` (`avatar_id`),
  ADD KEY `idx_property_ids` (`property_ids`(255));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `m_avatars`
--
ALTER TABLE `m_avatars`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `m_items`
--
ALTER TABLE `m_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;

--
-- AUTO_INCREMENT for table `t_home-lands`
--
ALTER TABLE `t_home-lands`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `t_mat-stores`
--
ALTER TABLE `t_mat-stores`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `t_meta_infos`
--
ALTER TABLE `t_meta_infos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `t_nfts`
--
ALTER TABLE `t_nfts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6232;

--
-- AUTO_INCREMENT for table `t_selling_nfts`
--
ALTER TABLE `t_selling_nfts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `t_user-items`
--
ALTER TABLE `t_user-items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=554;

--
-- AUTO_INCREMENT for table `t_user-wallets`
--
ALTER TABLE `t_user-wallets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=330;

--
-- AUTO_INCREMENT for table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `t_home-lands`
--
ALTER TABLE `t_home-lands`
  ADD CONSTRAINT `t_home-lands_ibfk_1` FOREIGN KEY (`home_id`) REFERENCES `t_nfts` (`id`),
  ADD CONSTRAINT `t_home-lands_ibfk_2` FOREIGN KEY (`land_id`) REFERENCES `t_nfts` (`id`);

--
-- Constraints for table `t_mat-stores`
--
ALTER TABLE `t_mat-stores`
  ADD CONSTRAINT `t_mat-stores_ibfk_1` FOREIGN KEY (`mat_id`) REFERENCES `t_nfts` (`id`),
  ADD CONSTRAINT `t_mat-stores_ibfk_2` FOREIGN KEY (`selling_id`) REFERENCES `t_selling_nfts` (`id`);

--
-- Constraints for table `t_nfts`
--
ALTER TABLE `t_nfts`
  ADD CONSTRAINT `t_nfts_ibfk_1` FOREIGN KEY (`token_address`) REFERENCES `m_nft_types` (`token_address`);

--
-- Constraints for table `t_selling_nfts`
--
ALTER TABLE `t_selling_nfts`
  ADD CONSTRAINT `t_selling_nfts_ibfk_1` FOREIGN KEY (`nft_id`) REFERENCES `t_nfts` (`id`);

--
-- Constraints for table `t_user-items`
--
ALTER TABLE `t_user-items`
  ADD CONSTRAINT `t_user-items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `t_users` (`id`),
  ADD CONSTRAINT `t_user-items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `m_items` (`id`);

--
-- Constraints for table `t_user-wallets`
--
ALTER TABLE `t_user-wallets`
  ADD CONSTRAINT `t_user-wallets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `t_users` (`id`);

--
-- Constraints for table `t_users`
--
ALTER TABLE `t_users`
  ADD CONSTRAINT `t_users_avatar_id_foreign_idx` FOREIGN KEY (`avatar_id`) REFERENCES `m_avatars` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
