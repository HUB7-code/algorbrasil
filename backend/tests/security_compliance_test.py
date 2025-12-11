
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.app.main import app
from backend.app.db.session import Base, get_db
from backend.app.core.security_encryption import encrypt_field, decrypt_field
from backend.app.models.user import User
from backend.app.models.audit import AuditLog

# Configuração de Banco de Testes (SQLite em memória)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_encryption_module():
    """
    LGPD CHECK: Validar se a criptografia está funcionando
    """
    phone = "11999887766"
    encrypted = encrypt_field(phone)
    decrypted = decrypt_field(encrypted)
    
    assert encrypted != phone, "FALHA: Dado não foi modificado pela criptografia"
    assert decrypted == phone, "FALHA: Decriptação não recuperou dado original"
    assert len(encrypted) > 20, "FALHA: String encriptada muito curta (provavelmente não é AES)"
    print("\n✅ [LGPD] Módulo de Criptografia: APROVADO")

def test_user_creation_security():
    """
    LGPD CHECK: Criar usuário e verificar se dados são salvos encriptados no DB
    """
    user_data = {
        "email": "lgpd_test@algor.com",
        "password": "StrongPassword123!",
        "full_name": "LGPD Audit User",
        "phone": "5511999998888"
    }
    
    response = client.post("/api/v1/signup", json=user_data)
    assert response.status_code == 201
    
    # Verificação Direta no Banco
    db = TestingSessionLocal()
    user_db = db.query(User).filter(User.email == user_data["email"]).first()
    
    assert user_db is not None
    assert user_db.phone != user_data["phone"], "CRÍTICO: Telefone salvo em Plain Text no banco!"
    assert decrypt_field(user_db.phone) == user_data["phone"], "Não foi possível recuperar o telefone"
    
    # [LGPD] Verificação de Auditoria
    from backend.app.models.audit import AuditLog
    audit_entry = db.query(AuditLog).filter(AuditLog.resource_id == str(user_db.id)).first()
    print(f"\n[DEBUG] User ID Created: {user_db.id}")
    print(f"[DEBUG] Audit Query Result: {audit_entry}")
    
    # Debug: List ALL audit logs
    all_logs = db.query(AuditLog).all()
    print(f"[DEBUG] All Audit Logs in DB: {[ (l.action, l.resource_id) for l in all_logs]}")

    assert audit_entry is not None, "CRÍTICO: Ação de criação de usuário NÃO foi auditada!"
    assert audit_entry.action == "USER_SIGNUP", "Ação de auditoria incorreta"
    
    print("\n✅ [LGPD] Armazenamento Seguro e Auditoria: APROVADO")
    db.close()

def test_sql_injection_attempt():
    """
    SECURITY CHECK: Tentar SQL Injection no login
    """
    injection_payload = {
        "email": "' OR '1'='1",
        "password": "any"
    }
    
    response = client.post("/api/v1/login", json=injection_payload)
    
    # Deve falhar com 401 ou 422 (validação), nunca 200 ou 500 (erro de sql)
    assert response.status_code in [401, 422], f"Vulnerabilidade Potencial: Respondeu {response.status_code}"
    print("\n✅ [SECURITY] Resistência a SQL Injection: APROVADO")

if __name__ == "__main__":
    # Executar testes manualmente se rodado como script
    print("🛡️  INICIANDO SUITE DE TESTES DE CONFORMIDADE LGPD 🛡️")
    try:
        test_encryption_module()
        test_user_creation_security()
        test_sql_injection_attempt()
        print("\n🎉 TODOS OS TESTES DE CONFORMIDADE PASSARAM!")
    except AssertionError as e:
        msg = f"FALHA DE CONFORMIDADE: {e}"
        print(f"\n{msg}")
        with open("compliance_report.log", "w", encoding="utf-8") as f: f.write(msg)
    except Exception as e:
        msg = f"ERRO NA EXECUCAO: {e}"
        print(f"\n{msg}")
        with open("compliance_report.log", "w", encoding="utf-8") as f: f.write(msg)
    else:
        msg = "SUCESSO: TODOS OS TESTES DE CONFORMIDADE PASSARAM!"
        with open("compliance_report.log", "w", encoding="utf-8") as f: f.write(msg)
    finally:
        # Limpar banco de teste
        import os
        engine.dispose() # Critical fix for Windows: Close handles before deleting
        if os.path.exists("./test.db"):
            try:
                os.remove("./test.db")
            except PermissionError:
                print("⚠️  Aviso: Não foi possível deletar test.db (arquivo em uso). Ignore se os testes passaram.")
