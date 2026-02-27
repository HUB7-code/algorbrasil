"""
Alembic environment configuration — Algor Brasil Backend.

Lee la DATABASE_URL desde las settings del proyecto para que funcione
igual en desarrollo, tests y producción sin cambios de configuración manual.
"""

import sys
import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# ── 1. Ajustar PYTHONPATH para que el import backend.app funcione
# Esto permite ejecutar `alembic upgrade head` desde el directorio /backend
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

# ── 2. Importar la app para que todos los modelos queden registrados en Base.metadata
from backend.app.core.config import settings
from backend.app.db.session import Base

# Importar TODOS los modelos para garantizar que las tablas estén registradas
from backend.app.models import (  # noqa: F401
    user, assessment, profiles, audit, risk, lms, payment,
    project, organization, ai_asset, governance, partner, lead
)

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# ── 3. Sobrescrever a URL do banco com a do settings (em vez de hardcodar no .ini)
config.set_main_option("sqlalchemy.url", settings.SQLALCHEMY_DATABASE_URI)

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# ── 4. Exportar os metadados para autogenerate funcionar
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.
    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        # Necessário para comparação de colunas em modo autogenerate
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.
    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            # Habilitar comparação de tipos para detectar mudanças de coluna
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
