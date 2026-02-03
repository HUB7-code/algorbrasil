from backend.app.db.session import engine, Base
from backend.app.models.ai_asset import AIAsset
from backend.app.models.risk import RiskRegister
from backend.app.models.organization import Organization, organization_members
from backend.app.models.lms import Course, CourseModule, CourseLesson, Enrollment

print("Criando tabelas faltantes no banco de dados...")
# Cria todas as tabelas registradas no Base.metadata que ainda não existem
Base.metadata.create_all(bind=engine)
print("Tabelas verificadas/criadas.")
