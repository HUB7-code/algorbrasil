"""
Migration: Add profile_image column to users table

Revision ID: 001_add_profile_image
Revises: 
Create Date: 2025-12-27
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector

# revision identifiers, used by Alembic.
revision = '001_add_profile_image'
down_revision = None
branch_labels = None
depends_on = None
def upgrade():
    """Add profile_image column to users table"""
    # Idempotente: apenas adiciona se não existe
    conn = op.get_bind()
    inspector = Inspector.from_engine(conn)
    columns = {col['name'] for col in inspector.get_columns('users')}
    if 'profile_image' not in columns:
        op.add_column('users', sa.Column('profile_image', sa.String(), nullable=True))


def downgrade():
    """Remove profile_image column from users table"""
    op.drop_column('users', 'profile_image')
