from slowapi import Limiter
from slowapi.util import get_remote_address

# Limitador Global
# Nota: request_filter removido devido a incompatibilidade de versão na pipeline de CI/CD.
# O Rate Limit aplica-se globalmente por IP.
limiter = Limiter(
    key_func=get_remote_address
)
