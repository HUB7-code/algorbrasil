
import pytest
from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.core.security_encryption import encrypt_field, decrypt_field

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

def test_user_creation_security(client, db_session):
    """
    LGPD CHECK: Criar usuário e verificar se dados são salvos encriptados no DB
    """
    from backend.app.models.user import User
    from backend.app.models.audit import AuditLog
    
    user_data = {
        "email": "lgpd_test@algor.com",
        "password": "StrongPassword123!",
        "full_name": "LGPD Audit User",
        "phone": "5511999998888"
    }
    
    response = client.post("/api/v1/auth/signup", json=user_data)
    assert response.status_code == 201, f"Signup falhou: {response.text}"
    
    # Verificação Direta no Banco usando db_session da fixture
    user_db = db_session.query(User).filter(User.email == user_data["email"]).first()
    
    assert user_db is not None
    assert user_db.phone != user_data["phone"], "CRÍTICO: Telefone salvo em Plain Text no banco!"
    assert decrypt_field(user_db.phone) == user_data["phone"], "Não foi possível recuperar o telefone"
    
    # [LGPD] Verificação de Auditoria
    audit_entry = db_session.query(AuditLog).filter(AuditLog.resource_id == str(user_db.id)).first()
    print(f"\n[DEBUG] User ID Created: {user_db.id}")
    print(f"[DEBUG] Audit Query Result: {audit_entry}")
    
    # Debug: List ALL audit logs
    all_logs = db_session.query(AuditLog).all()
    print(f"[DEBUG] All Audit Logs in DB: {[(l.action, l.resource_id) for l in all_logs]}")

    assert audit_entry is not None, "CRÍTICO: Ação de criação de usuário NÃO foi auditada!"
    assert audit_entry.action == "USER_SIGNUP", "Ação de auditoria incorreta"
    
    print("\n✅ [LGPD] Armazenamento Seguro e Auditoria: APROVADO")

def test_sql_injection_attempt(client):
    """
    SECURITY CHECK: Tentar SQL Injection no login
    """
    injection_payload = {
        "email": "' OR '1'='1",
        "password": "any"
    }
    
    response = client.post("/api/v1/auth/login", json=injection_payload)
    
    # Deve falhar com 401 ou 422 (validação), nunca 200 ou 500 (erro de sql)
    assert response.status_code in [401, 422], f"Vulnerabilidade Potencial: Respondeu {response.status_code}"
    print("\n✅ [SECURITY] Resistência a SQL Injection: APROVADO")

if __name__ == "__main__":
    # Executar testes manualmente se rodado como script
    print("🛡️  INICIANDO SUITE DE TESTES DE CONFORMIDADE LGPD 🛡️")
    import pytest
    pytest.main([__file__, "-v"])
