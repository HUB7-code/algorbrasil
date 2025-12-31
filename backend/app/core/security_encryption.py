# -*- coding: utf-8 -*-
from cryptography.fernet import Fernet
import os
import base64
from dotenv import load_dotenv

load_dotenv()

# Recupera a chave de encriptação do ambiente ou gera uma temporária ( inseguro, apenas para dev)
# Em produção, isso DEVE vir de uma variável de ambiente segura.
ENCRYPTION_KEY_ENV = os.getenv("DATA_ENCRYPTION_KEY")

if not ENCRYPTION_KEY_ENV:
    # Fallback para desenvolvimento apenas - Nunca usar em prod
    # Gera uma chave válida para Fernet (32 url-safe base64-encoded bytes)
    print("WARNING: DATA_ENCRYPTION_KEY not found. Using temporary insecure key.")
    _key = Fernet.generate_key()
else:
    _key = ENCRYPTION_KEY_ENV.encode()

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
