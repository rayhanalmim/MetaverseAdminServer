
-- Username: superadmin
-- Password: metaverse2024

-- Add admin_role column to t_users table for dynamic admin permission checking
ALTER TABLE t_users 
ADD COLUMN IF NOT EXISTS admin_role ENUM('user', 'admin', 'superadmin') NOT NULL DEFAULT 'user';

INSERT INTO t_users (
    username, 
    email, 
    password, 
    wallet_address,
    last_room,
    avatar_id,
    nonce,
    admin_role,
    created_at, 
    updated_at,
    nft_metadata
) VALUES (
    'superadmin',
    'superadmin@metaverse.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVkDe0rK6wjYeHqOBqVzAahm', -- bcrypt hash for 'metaverse2024'
    NULL,
    '0',
    1,
    NULL,
    'superadmin',
    NOW(),
    NOW(),
    JSON_ARRAY()
) ON DUPLICATE KEY UPDATE
    password = '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVkDe0rK6wjYeHqOBqVzAahm',
    admin_role = 'superadmin',
    updated_at = NOW();

-- Update existing admin users to have proper admin roles
UPDATE t_users 
SET admin_role = CASE 
    WHEN username = 'superadmin' THEN 'superadmin'
    WHEN username = 'admin' THEN 'admin'
    WHEN username = 'rayhanalmim1@gmail.com' THEN 'admin'
    ELSE 'user'
END
WHERE username IN ('superadmin', 'admin', 'rayhanalmim1@gmail.com');

-- Create admin roles table (optional for future role-based access)
CREATE TABLE IF NOT EXISTS `t_admin_roles` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `role` enum('admin','superadmin','moderator') NOT NULL DEFAULT 'admin',
    `permissions` JSON DEFAULT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_user_role` (`user_id`, `role`),
    FOREIGN KEY (`user_id`) REFERENCES `t_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Insert admin roles for the created users
INSERT INTO t_admin_roles (user_id, role, permissions, created_at, updated_at)
SELECT 
    u.id,
    CASE 
        WHEN u.username = 'admin' THEN 'admin'
        WHEN u.username = 'superadmin' THEN 'superadmin'
    END as role,
    JSON_OBJECT(
        'dashboard_access', true,
        'user_management', true,
        'nft_management', true,
        'system_settings', CASE WHEN u.username = 'superadmin' THEN true ELSE false END
    ) as permissions,
    NOW(),
    NOW()
FROM t_users u 
WHERE u.username IN ('admin', 'superadmin')
ON DUPLICATE KEY UPDATE
    permissions = VALUES(permissions),
    updated_at = NOW();