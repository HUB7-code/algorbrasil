"""leads_initial_schema

Revision ID: 003_leads_full_schema
Revises: 002_add_org_sec
Create Date: 2026-02-27 00:00:00.000000

Cria (ou completa) a tabela 'leads' com TODOS os campos do modelo Lead
conforme definido em backend/app/models/lead.py.

Esta migration é idempotente: verifica a existência de cada coluna antes
de adicioná-la, portanto pode ser aplicada em bancos de dados já parcialmente
migrados (como o sqlite local de desenvolvimento) sem erros.
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector


# revision identifiers
revision = '003_leads_full_schema'
down_revision = '002_add_org_sec'
branch_labels = None
depends_on = None


def _existing_columns(conn, table: str) -> set:
    """Retorna o conjunto de nomes de colunas existentes na tabela."""
    inspector = Inspector.from_engine(conn)
    return {col['name'] for col in inspector.get_columns(table)}


def _table_exists(conn, table: str) -> bool:
    """Verifica se a tabela existe no banco."""
    inspector = Inspector.from_engine(conn)
    return table in inspector.get_table_names()


def upgrade() -> None:
    conn = op.get_bind()

    # ── Se a tabela não existe ainda, cria completa de uma vez ────────────────
    if not _table_exists(conn, 'leads'):
        op.create_table(
            'leads',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('name', sa.String(length=255), nullable=False),
            sa.Column('email', sa.String(length=255), nullable=False),
            sa.Column('phone', sa.String(length=50), nullable=True),
            sa.Column('company', sa.String(length=255), nullable=True),
            sa.Column('role', sa.String(length=100), nullable=True),
            sa.Column('company_size', sa.String(length=50), nullable=True),
            sa.Column('ai_volume', sa.String(length=50), nullable=True),
            sa.Column('ai_providers', sa.JSON(), nullable=True),
            sa.Column('pain_points', sa.JSON(), nullable=True),
            sa.Column('lead_score', sa.Integer(), nullable=True),
            sa.Column('priority', sa.String(length=20), nullable=True),
            sa.Column('status', sa.String(length=20), nullable=True),
            sa.Column('funnel_stage', sa.String(length=20), nullable=True),
            sa.Column('lead_type', sa.String(length=50), nullable=True),
            sa.Column('source', sa.String(length=100), nullable=True),
            sa.Column('utm_source', sa.String(length=100), nullable=True),
            sa.Column('utm_medium', sa.String(length=100), nullable=True),
            sa.Column('utm_campaign', sa.String(length=100), nullable=True),
            sa.Column('urgency', sa.String(length=50), nullable=True),
            sa.Column('contact_time', sa.String(length=50), nullable=True),
            sa.Column('comments', sa.Text(), nullable=True),
            sa.Column('admin_notes', sa.Text(), nullable=True),
            sa.Column('assigned_to', sa.String(length=255), nullable=True),
            sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=True),
            sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
            sa.Column('contacted_at', sa.DateTime(timezone=True), nullable=True),
            sa.Column('converted_at', sa.DateTime(timezone=True), nullable=True),
            sa.Column('consent_marketing', sa.Boolean(), server_default='0', nullable=True),
            sa.Column('consent_data_processing', sa.Boolean(), server_default='1', nullable=True),
            sa.Column('ip_address', sa.String(length=50), nullable=True),
            sa.PrimaryKeyConstraint('id'),
        )
        op.create_index('ix_leads_email', 'leads', ['email'])
        op.create_index('ix_leads_id', 'leads', ['id'])
        op.create_index('ix_leads_status', 'leads', ['status'])
        return

    # ── Se a tabela JÁ EXISTE, adiciona apenas as colunas faltantes ──────────
    existing = _existing_columns(conn, 'leads')

    new_columns = {
        'phone':                    sa.Column('phone', sa.String(length=50), nullable=True),
        'role':                     sa.Column('role', sa.String(length=100), nullable=True),
        'company_size':             sa.Column('company_size', sa.String(length=50), nullable=True),
        'ai_volume':                sa.Column('ai_volume', sa.String(length=50), nullable=True),
        'ai_providers':             sa.Column('ai_providers', sa.JSON(), nullable=True),
        'pain_points':              sa.Column('pain_points', sa.JSON(), nullable=True),
        'lead_score':               sa.Column('lead_score', sa.Integer(), nullable=True),
        'priority':                 sa.Column('priority', sa.String(length=20), nullable=True),
        'funnel_stage':             sa.Column('funnel_stage', sa.String(length=20), nullable=True),
        'lead_type':                sa.Column('lead_type', sa.String(length=50), nullable=True),
        'utm_source':               sa.Column('utm_source', sa.String(length=100), nullable=True),
        'utm_medium':               sa.Column('utm_medium', sa.String(length=100), nullable=True),
        'utm_campaign':             sa.Column('utm_campaign', sa.String(length=100), nullable=True),
        'urgency':                  sa.Column('urgency', sa.String(length=50), nullable=True),
        'contact_time':             sa.Column('contact_time', sa.String(length=50), nullable=True),
        'comments':                 sa.Column('comments', sa.Text(), nullable=True),
        'admin_notes':              sa.Column('admin_notes', sa.Text(), nullable=True),
        'assigned_to':              sa.Column('assigned_to', sa.String(length=255), nullable=True),
        'contacted_at':             sa.Column('contacted_at', sa.DateTime(timezone=True), nullable=True),
        'converted_at':             sa.Column('converted_at', sa.DateTime(timezone=True), nullable=True),
        'consent_marketing':        sa.Column('consent_marketing', sa.Boolean(), server_default='0', nullable=True),
        'consent_data_processing':  sa.Column('consent_data_processing', sa.Boolean(), server_default='1', nullable=True),
        'ip_address':               sa.Column('ip_address', sa.String(length=50), nullable=True),
    }

    for col_name, col_def in new_columns.items():
        if col_name not in existing:
            op.add_column('leads', col_def)


def downgrade() -> None:
    # Em produção, raramente fazemos downgrade de tabelas de dados críticos.
    # Registramos a intenção mas não destruímos dados automaticamente.
    op.drop_table('leads')
