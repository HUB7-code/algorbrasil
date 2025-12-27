"""add_org_and_security_fields

Revision ID: 002_add_org_sec
Revises: 
Create Date: 2025-12-27 18:05:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '002_add_org_sec'
down_revision = None  # Ajustaremos isso manualmente se necessário, ou deixamos o autogenerate lidar
branch_labels = None
depends_on = None


def upgrade():
    # 1. Atualizar Users
    # Verifica se colunas já existem para evitar erros em bancos manuais
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    columns = [x['name'] for x in inspector.get_columns('users')]
    
    if 'totp_secret' not in columns:
        op.add_column('users', sa.Column('totp_secret', sa.String(), nullable=True))
    if 'is_totp_enabled' not in columns:
        op.add_column('users', sa.Column('is_totp_enabled', sa.Boolean(), server_default='0', nullable=True))
    
    # 2. Atualizar Organizations
    org_columns = [x['name'] for x in inspector.get_columns('organizations')]
    
    if 'plan_tier' not in org_columns:
        op.add_column('organizations', sa.Column('plan_tier', sa.String(), server_default='free', nullable=True))
    if 'credits_balance' not in org_columns:
        op.add_column('organizations', sa.Column('credits_balance', sa.Integer(), server_default='3', nullable=True))


def downgrade():
    op.drop_column('organizations', 'credits_balance')
    op.drop_column('organizations', 'plan_tier')
    op.drop_column('users', 'is_totp_enabled')
    op.drop_column('users', 'totp_secret')
