# ==========================================================
# ALGOR BRASIL - PRODUCTION DB SYNC SCRIPT
# ==========================================================
# This script ensures that ALL tables defined in the SQLAlchemy 
# models exist in the production database. 
# It is safe to run multiple times (idempotent).
# ==========================================================

import os
import sys
from pathlib import Path

# Add the project root to sys.path
BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

try:
    from backend.app.db.session import engine, Base
    # Explicitly import all models to ensure they are registered in Base.metadata
    from backend.app.models import (
        user, assessment, profiles, audit, risk, lms, payment,
        project, organization, ai_asset, governance, partner, lead
    )
    print("✅ Models imported successfully.")
    
    print("🔄 Synchronizing database schema...")
    # This will create any missing tables. It will NOT drop or alter existing ones.
    Base.metadata.create_all(bind=engine)
    print("✅ Database synchronization complete!")
    
except ImportError as e:
    print(f"❌ Error: Could not import models. Are you running this from the backend directory?")
    print(f"Details: {e}")
    sys.exit(1)
except Exception as e:
    print(f"❌ An unexpected error occurred: {e}")
    sys.exit(1)
