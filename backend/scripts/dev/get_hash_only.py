from passlib.context import CryptContext

# Explicitly use argon2 as per security.py
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

try:
    hash1 = get_password_hash('admin123')
    hash2 = get_password_hash('admin')
    print(f"HASH_ADMIN123||{hash1}||END")
    print(f"HASH_ADMIN||{hash2}||END")
except Exception as e:
    print(f"ERROR||{e}||END")
