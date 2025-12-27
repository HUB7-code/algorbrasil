import logging
import sqlite3
import os
from datetime import datetime
from passlib.context import CryptContext

# Configuração Básica de Log e Senha
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DB_PATH = "backend/sql_app.db"
# Fallback se estiver rodando dentro do container onde o workdir é /app
if not os.path.exists(DB_PATH) and os.path.exists("sql_app.db"):
    DB_PATH = "sql_app.db"

def init_db():
    logger.info(f"💾 Connecting to database at: {DB_PATH}")
    
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        user_email = "admin@algor.com"
        
        # 1. Verifica se Admin existe
        cursor.execute("SELECT id FROM users WHERE email = ?", (user_email,))
        user_row = cursor.fetchone()
        
        user_id = None
        
        if not user_row:
            logger.info("➕ Creating Superuser (SQL Raw)...")
            hashed_pw = pwd_context.hash("admin")
            now = datetime.utcnow()
            
            # Adicionando colunas novas (totp_secret, etc) se existirem no schema
            # Mas vamos usar o básico que sabemos que funciona
            cursor.execute("""
                INSERT INTO users (email, hashed_password, full_name, role, is_active, is_superuser, is_totp_enabled)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (user_email, hashed_pw, "Algor Super Admin", "admin", 1, 1, 0))
            
            user_id = cursor.lastrowid
            logger.info(f"✅ User created with ID: {user_id}")
        else:
            user_id = user_row[0]
            logger.info(f"✅ Superuser already exists (ID: {user_id}).")

        # 2. Verifica/Cria Organização
        cursor.execute("SELECT id, plan_tier FROM organizations WHERE owner_id = ?", (user_id,))
        org_row = cursor.fetchone()
        
        if not org_row:
            logger.info("➕ Creating Admin Organization...")
            cursor.execute("""
                INSERT INTO organizations (name, owner_id, cnpj, plan_tier, credits_balance)
                VALUES (?, ?, ?, ?, ?)
            """, ("Algor HQ", user_id, "00.000.000/0001-91", "enterprise", 9999))
            logger.info("✅ Organization created.")
        else:
            # Update para Enterprise se não for
            current_tier = org_row[1]
            if current_tier != 'enterprise':
                cursor.execute("UPDATE organizations SET plan_tier = 'enterprise' WHERE id = ?", (org_row[0],))
                logger.info("🔄 Organization updated to Enterprise.")

        # 3. Verifica/Cria Perfil
        cursor.execute("SELECT id FROM corporate_profiles WHERE user_id = ?", (user_id,))
        profile_row = cursor.fetchone()
        
        if not profile_row:
            logger.info("➕ Creating Corporate Profile...")
            cursor.execute("""
                INSERT INTO corporate_profiles (user_id, company_name, role, industry, employee_count, privacy_level)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (user_id, "Algor Brasil", "CTO", "Technology", "51-200", "High"))
            logger.info("✅ Profile created.")
            
        conn.commit()
        conn.close()
            
    except Exception as e:
        logger.error(f"❌ Error during initialization: {e}")

if __name__ == "__main__":
    logger.info("🚀 Initializing Data (Robust SQL Mode)...")
    init_db()
    logger.info("🏁 Initialization Complete.")
