import os
import sys
from alembic.config import Config
from alembic import command

# Add the root directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

def generate():
    # Change to backend directory
    os.chdir("backend")
    alembic_cfg = Config("alembic.ini")
    command.revision(alembic_cfg, message="feat_sync_phase2_full", autogenerate=True)
    print("Migration generated successfully.")

if __name__ == "__main__":
    generate()
