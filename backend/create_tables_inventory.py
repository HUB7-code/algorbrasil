from backend.app.db.session import engine, Base
from backend.app.models.ai_asset import AIAsset
from backend.app.models.user import User # Necessário para FK

print("Creating inventory tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully.")
