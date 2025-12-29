from backend.app.db.session import Base, engine, SessionLocal
from backend.app.core.security import get_password_hash
# Importar todos os modelos
from backend.app.models import user, assessment, profiles, audit, risk, lms, payment, project, organization, ai_asset, governance
from datetime import datetime

def reset_and_seed():
    print("⚠️  INICIANDO FULL RESET (COM CRIAÇÃO DE ORG)...")
    
    # 1. Drop All
    try:
        Base.metadata.drop_all(bind=engine)
        print("✅ Tabelas limpas.")
    except Exception as e:
        print(f"⚠️  Erro no drop: {e}")

    # 2. Create All
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Tabelas recriadas.")
    except Exception as e:
        print(f"❌ Erro no create: {e}")
        return
    
    # 3. Create Admin Completo
    db = SessionLocal()
    try:
        admin_email = "admin@algorbrasil.com.br"
        admin_pass = "admin"
        
        # 3.1 Usuário
        superuser = user.User(
            email=admin_email,
            hashed_password=get_password_hash(admin_pass),
            full_name="Algor Super Admin",
            role="admin",
            is_active=True,
            is_superuser=True,
            is_totp_enabled=False
        )
        db.add(superuser)
        db.flush() # Para gerar o ID do superuser

        # 3.2 Organização (O Pulo do Gato 🐈)
        # Sem isso, o frontend trava na tela preta
        admin_org = organization.Organization(
            name="Algor HQ",
            owner_id=superuser.id,
            cnpj="00.000.000/0001-91",
            plan_tier="enterprise", # Admin já nasce Enterprise
            credits_balance=9999
        )
        db.add(admin_org)
        db.flush()

        # 3.3 Membro da Organização
        # (Adicionar o usuário como membro da própria org)
        # Nota: Dependendo da relação n:n, pode ser automático via owner, mas vamos garantir
        # Se houver tabela de associação, seria aqui. Mas owner_id já garante ownership.

        # 3.4 Perfil (Para pular o Onboarding)
        # 3.4 Perfil (Para pular o Onboarding)
        admin_profile = profiles.CorporateProfile(
            user_id=superuser.id,
            company_name="Algor Brasil",
            sector="Technology",
            size_range="51-200",
            website="https://algorbrasil.com.br"
        )
        db.add(admin_profile)

        # 3.5 Bônus: Perfil Profissional
        prof_profile = profiles.ProfessionalProfile(
            user_id=superuser.id,
            bio="System Administrator",
            years_experience=10,
            linkedin_url="https://linkedin.com/in/admin",
            primary_expertise="Security"
        )
        db.add(prof_profile)

        db.commit()
        print(f"✅ Superusuário COMPLETO criado!")
        print(f"   🏢 Org: Algor HQ (Enterprise)")
        print(f"   👤 Perfil: CTO (Onboarding Pulado)")
        
    except Exception as e:
        print(f"❌ Erro ao criar admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_and_seed()
