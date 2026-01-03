from slowapi import Limiter
from slowapi.util import get_remote_address
from backend.app.core.config import settings

def whitelist_filter(request):
    """
    Retorna True se o IP estiver na whitelist, ignorando o Rate Limit.
    """
    remote_addr = get_remote_address(request)
    return remote_addr in settings.WHITELISTED_IPS

# Limitador Global com Whitelist Dinâmica
limiter = Limiter(
    key_func=get_remote_address,
    request_filter=whitelist_filter
)
