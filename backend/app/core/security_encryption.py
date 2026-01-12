# -*- coding: utf-8 -*-
from cryptography.fernet import Fernet
import os
import base64
from dotenv import load_dotenv

load_dotenv()

# Recupera a chave de encriptação do ambiente ou gera uma temporária ( inseguro, apenas para dev)
# Em produção, isso DEVE vir de uma variável de ambiente segura.
# Recupera a chave de encriptação do ambiente
ENCRYPTION_KEY_ENV = os.getenv("DATA_ENCRYPTION_KEY")

if not ENCRYPTION_KEY_ENV:
    # Se não houver chave no .env, avisa e gera uma.
    # Em produção isso deveria parar a aplicação, mas em dev facilitamos.
    print("⚠️ WARNING: DATA_ENCRYPTION_KEY not found in .env. Using temporary key.")
    _key = Fernet.generate_key()
else:
    # IMPORTANTE: .strip() remove quebras de linha ou espaços acidentais do .env
    _key = ENCRYPTION_KEY_ENV.strip().encode()

try:
    cipher_suite = Fernet(_key)
except ValueError as e:
    print(f"❌ CRITICAL SECURITY ERROR: Invalid DATA_ENCRYPTION_KEY format. Details: {e}")
    # Se a chave do .env for inválida, é melhor gerar uma nova para não travar o server em dev
    print("🔄 Generating valid temporary key to keep server running...")
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
