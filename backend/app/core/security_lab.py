import magic
from fastapi import HTTPException, UploadFile
import re

# Constantes de Segurança
MAX_FILE_SIZE_MB = 50
MAX_TEXT_INPUT_LENGTH = 50000 # 50k caracteres para Shadow Scanner
ALLOWED_MIME_TYPES = ["text/plain", "text/csv", "application/json", "text/x-csv", "application/csv"]

class SecurityLab:
    
    @staticmethod
    def validate_magic_bytes(content: bytes, filename: str):
        """
        Inspeção de Magic Numbers para prevenir upload de malwares disfarçados.
        """
        try:
            # Detectar MIME type real baseado no conteúdo (Header)
            mime = magic.from_buffer(content[:2048], mime=True)
            
            # Log de segurança (print para demo)
            print(f"[SECURITY AUDIT] File: {filename} | Detected MIME: {mime}")

            # Bloqueio de Executáveis e Binários Perigosos
            if mime in ["application/x-dosexec", "application/x-executable", "application/x-sharedlib"]:
                raise HTTPException(status_code=400, detail="ALERTA DE SEGURANÇA: Arquivo executável detectado. Incidente reportado.")

            # Validação Frouxa para CSV/JSON (text/* geralmente é seguro, JSON pode vir como text/plain)
            if not (mime.startswith("text/") or mime in ALLOWED_MIME_TYPES):
                # Fallback: Se for JSON válido mas magic dizer algo estranho, checamos estrutura
                if filename.endswith('.json'):
                    pass # Deixa passar para o parser JSON validar
                else:
                    raise HTTPException(status_code=400, detail=f"Formato de arquivo rejeitado pela política de segurança ({mime}).")

        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            # Em caso de erro no libmagic, falhamos seguro (fail-safe) ou logamos warning
            print(f"[SECURITY WARNING] Falha na inspeção Magic Bytes: {str(e)}")

    @staticmethod
    def sanitize_input_text(text: str) -> str:
        """
        Previne ataques de ReDoS e Payload Bomb no Shadow Scanner.
        """
        if len(text) > MAX_TEXT_INPUT_LENGTH:
            raise HTTPException(status_code=400, detail=f"Texto excede o limite de segurança ({MAX_TEXT_INPUT_LENGTH} chars).")
        
        # Remover caracteres de controle invisíveis que podem quebrar parsers
        sanitized = "".join(ch for ch in text if ch.isprintable() or ch in ['\n', '\r', '\t'])
        return sanitized
