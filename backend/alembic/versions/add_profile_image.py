"""
Migration: Add profile_image column to users table

Revision ID: add_profile_image
Create Date: 2025-12-27
"""
from alembic import op
import sqlalchemy as sa


def upgrade():
    """Add profile_image column to users table"""
    # Adicionar coluna profile_image (nullable)
    op.add_column('users', sa.Column('profile_image', sa.String(), nullable=True))
    print("✅ Coluna 'profile_image' adicionada à tabela 'users'")


def downgrade():
    """Remove profile_image column from users table"""
    op.drop_column('users', 'profile_image')
    print("✅ Coluna 'profile_image' removida da tabela 'users'")
