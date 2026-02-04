# -*- coding: utf-8 -*-
from cryptography.fernet import Fernet
import os
import base64
from dotenv import load_dotenv

load_dotenv()

# Recupera a chave de encriptação do ambiente
ENCRYPTION_KEY_ENV = os.getenv("DATA_ENCRYPTION_KEY")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")  # production | development

if not ENCRYPTION_KEY_ENV:
    if ENVIRONMENT == "production":
        # PRODUÇÃO: FALHA CRÍTICA - Não pode rodar sem chave
        raise RuntimeError(
            "❌ CRITICAL SECURITY ERROR: DATA_ENCRYPTION_KEY is required in production. "
            "Generate one with: python -c 'from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())'"
        )
    else:
        # DESENVOLVIMENTO: Gera chave temporária com aviso
        print("⚠️ WARNING: DATA_ENCRYPTION_KEY not found in .env. Using temporary key (DEVELOPMENT ONLY).")
        print("🔧 Generate a permanent key with: python -c 'from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())'")
        _key = Fernet.generate_key()
else:
    # IMPORTANTE: .strip() remove quebras de linha ou espaços acidentais do .env
    _key = ENCRYPTION_KEY_ENV.strip().encode()

try:
    cipher_suite = Fernet(_key)
except ValueError as e:
    error_msg = f"❌ CRITICAL SECURITY ERROR: Invalid DATA_ENCRYPTION_KEY format. Details: {e}"
    
    if ENVIRONMENT == "production":
        # PRODUÇÃO: FALHA IMEDIATA
        raise RuntimeError(error_msg)
    else:
        # DESENVOLVIMENTO: Fallback com aviso
        print(error_msg)
        print("🔄 Generating valid temporary key to keep server running (DEVELOPMENT ONLY)...")
        _key = Fernet.generate_key()
        cipher_suite = Fernet(_key)

def encrypt_field(plaintext: str) -> str:
    """
    Encripta uma string usando Fernet (AES-128-CBC com HMAC).
    Retorna a string encriptada em base64.
    """
    if not plaintext:
        return None
    
    # Fernet espera bytes, então encode utf-8
    encrypted_bytes = cipher_suite.encrypt(plaintext.encode('utf-8'))
    # Retorna como string para salvar no banco
    return encrypted_bytes.decode('utf-8')

def decrypt_field(ciphertext: str) -> str:
    """
    Decripta uma string Fernet.
    Retorna a string original.
    """
    if not ciphertext:
        return None
        
    try:
        decrypted_bytes = cipher_suite.decrypt(ciphertext.encode('utf-8'))
        return decrypted_bytes.decode('utf-8')
    except Exception as e:
        print(f"Erro na decriptação: {e}")
        return None
