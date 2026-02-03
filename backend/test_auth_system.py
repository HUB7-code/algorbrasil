#!/usr/bin/env python3
"""
ALGOR BRASIL - Script de Teste do Sistema de Autenticação e E-mail
Versão: 1.0
Data: 03/02/2026
"""

import sys
import os

# Adicionar o diretório raiz ao path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app.core.config import settings
from backend.app.services.email_service import send_smtp_email

def test_config():
    """Testa se as configurações estão corretas"""
    print("=" * 60)
    print("🔍 TESTE 1: Configurações de E-mail")
    print("=" * 60)
    
    print(f"✓ SMTP Server: {settings.SMTP_SERVER}")
    print(f"✓ SMTP Port: {settings.SMTP_PORT}")
    print(f"✓ SMTP User: {settings.SMTP_USER}")
    print(f"✓ SMTP Password: {'*' * len(settings.SMTP_PASSWORD) if settings.SMTP_PASSWORD else '❌ NOT SET'}")
    print(f"✓ SMTP From Email: {settings.SMTP_FROM_EMAIL if hasattr(settings, 'SMTP_FROM_EMAIL') else settings.SMTP_USER}")
    print(f"✓ Frontend URL: {settings.FRONTEND_URL}")
    print(f"✓ Secret Key: {'*' * 20}... (OK)" if settings.SECRET_KEY else "❌ NOT SET")
    
    # Validações
    errors = []
    
    if not settings.SMTP_USER:
        errors.append("❌ SMTP_USER não configurado")
    elif '@' not in settings.SMTP_USER:
        errors.append(f"⚠️  SMTP_USER parece incompleto: {settings.SMTP_USER}")
    
    if not settings.SMTP_PASSWORD:
        errors.append("❌ SMTP_PASSWORD não configurado")
    
    if settings.SECRET_KEY == "dev-secret-key-change-in-production-use-env-file":
        errors.append("⚠️  Usando SECRET_KEY padrão (OK para dev, CRÍTICO para prod)")
    
    if errors:
        print("\n🔴 PROBLEMAS ENCONTRADOS:")
        for error in errors:
            print(f"  {error}")
        return False
    else:
        print("\n✅ Todas as configurações estão OK!")
        return True

def test_logo_path():
    """Testa se a logo existe"""
    print("\n" + "=" * 60)
    print("🔍 TESTE 2: Caminho da Logo")
    print("=" * 60)
    
    current_dir = os.getcwd()
    if os.path.basename(current_dir) == "backend":
        base_dir = os.path.abspath(os.path.join(current_dir, ".."))
    else:
        base_dir = current_dir
    
    logo_path = os.path.join(base_dir, "frontend", "public", "logo-algor.webp")
    
    print(f"Base Dir: {base_dir}")
    print(f"Logo Path: {logo_path}")
    
    if os.path.exists(logo_path):
        size = os.path.getsize(logo_path)
        print(f"✅ Logo encontrada! (Tamanho: {size} bytes)")
        return True
    else:
        print(f"❌ Logo NÃO encontrada em: {logo_path}")
        return False

def test_email_send():
    """Testa envio de e-mail real"""
    print("\n" + "=" * 60)
    print("🔍 TESTE 3: Envio de E-mail de Teste")
    print("=" * 60)
    
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        print("⚠️  Pulando teste de envio (credenciais não configuradas)")
        return False
    
    test_email = settings.SMTP_USER
    subject = "🧪 Teste do Sistema ALGOR - Ignore este e-mail"
    
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="margin: 0; padding: 0; background-color: #0A0E1A; font-family: Arial, sans-serif; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #131825; border-radius: 12px; padding: 40px; border: 1px solid #00FF94;">
            <h2 style="color: #00FF94; margin-top: 0;">✅ Teste de E-mail Bem-Sucedido!</h2>
            <p style="color: #A0AEC0; font-size: 15px; line-height: 1.6;">
                Este é um e-mail de teste automático do sistema ALGOR BRASIL.
            </p>
            <p style="color: #718096; font-size: 14px;">
                Se você recebeu este e-mail, significa que o sistema de envio está funcionando corretamente.
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1C2333; color: #4a5568; font-size: 11px; text-align: center;">
                <p>© 2026 Algor Association. Secure Enclave.</p>
                <p>Teste realizado em: {timestamp}</p>
            </div>
        </div>
    </body>
    </html>
    """.format(timestamp=__import__('datetime').datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
    
    print(f"Enviando e-mail de teste para: {test_email}")
    print("Aguarde...")
    
    try:
        send_smtp_email(test_email, subject, html_content)
        print("✅ E-mail enviado com sucesso!")
        print(f"   Verifique a caixa de entrada de: {test_email}")
        return True
    except Exception as e:
        print(f"❌ Erro ao enviar e-mail: {str(e)}")
        return False

def test_database_connection():
    """Testa conexão com o banco de dados"""
    print("\n" + "=" * 60)
    print("🔍 TESTE 4: Conexão com Banco de Dados")
    print("=" * 60)
    
    try:
        from backend.app.db.session import engine
        from sqlalchemy import text
        
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print(f"✅ Conexão com banco OK!")
            print(f"   Database URI: {settings.SQLALCHEMY_DATABASE_URI}")
            return True
    except Exception as e:
        print(f"❌ Erro ao conectar com banco: {str(e)}")
        return False

def main():
    """Executa todos os testes"""
    print("\n" + "=" * 60)
    print("🚀 ALGOR BRASIL - Teste do Sistema de Autenticação")
    print("=" * 60)
    
    results = {
        "Configurações": test_config(),
        "Logo": test_logo_path(),
        "Banco de Dados": test_database_connection(),
        "Envio de E-mail": test_email_send(),
    }
    
    print("\n" + "=" * 60)
    print("📊 RESUMO DOS TESTES")
    print("=" * 60)
    
    for test_name, passed in results.items():
        status = "✅ PASSOU" if passed else "❌ FALHOU"
        print(f"{test_name:20} → {status}")
    
    total = len(results)
    passed = sum(results.values())
    
    print("\n" + "=" * 60)
    print(f"RESULTADO FINAL: {passed}/{total} testes passaram")
    
    if passed == total:
        print("🎉 SISTEMA 100% FUNCIONAL!")
    elif passed >= total * 0.75:
        print("⚠️  SISTEMA PARCIALMENTE FUNCIONAL")
    else:
        print("🔴 SISTEMA COM PROBLEMAS CRÍTICOS")
    
    print("=" * 60)
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
