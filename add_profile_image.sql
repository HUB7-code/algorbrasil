-- ============================================
-- MIGRATION: Add profile_image to users table
-- Date: 2025-12-27
-- ============================================

-- Adicionar coluna profile_image (nullable)
ALTER TABLE users ADD COLUMN profile_image VARCHAR(255) NULL;

-- Verificar se a coluna foi adicionada
SELECT sql FROM sqlite_master WHERE type='table' AND name='users';

-- Mensagem de sucesso
SELECT '✅ Migration concluída! Coluna profile_image adicionada.' AS status;
