-- Live Stream Table Migration
-- This script creates the table for storing YouTube live stream URLs

CREATE TABLE IF NOT EXISTS `t_live_streams` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `youtube_url` text NOT NULL,
    `description` text,
    `is_active` tinyint(1) NOT NULL DEFAULT '1',
    `created_by` int NOT NULL,
    `view_count` int NOT NULL DEFAULT '0',
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_is_active` (`is_active`),
    KEY `idx_created_by` (`created_by`),
    KEY `idx_created_at` (`created_at`),
    CONSTRAINT `fk_live_streams_created_by` 
        FOREIGN KEY (`created_by`) REFERENCES `t_users` (`id`) 
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional)
-- INSERT INTO `t_live_streams` (`title`, `youtube_url`, `description`, `is_active`, `created_by`) 
-- VALUES ('Metaverse Live Demo', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Live demonstration of our metaverse world', 1, 1);
