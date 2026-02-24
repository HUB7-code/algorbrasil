from passlib.context import CryptContext

# Configuração do contexto de criptografia de senha
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

