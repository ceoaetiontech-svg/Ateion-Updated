-- Add an admin user (replace email/password hash with actual values)
-- Password hash should be a BCrypt hash of the chosen password.
-- Generate one at: https://bcrypt-generator.com/ or use:
--   python3 -c "import bcrypt; print(bcrypt.hashpw(b'your-password', bcrypt.gensalt()).decode())"
INSERT INTO users (full_name, email, password, age_segment, role, is_premium, created_at)
VALUES ('Admin', 'admin@ateion.com', '$2a$10$REPLACE_WITH_ACTUAL_BCRYPT_HASH', 'Segment 5 (Professional)', 'ROLE_ADMIN', true, NOW())
ON CONFLICT (email) DO UPDATE SET role = 'ROLE_ADMIN';
