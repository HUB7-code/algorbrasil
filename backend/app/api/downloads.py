from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from backend.app.api.auth import get_current_user
from backend.app.models.user import User
import os

router = APIRouter()

PROTECTED_FILES_DIR = "backend/protected_files"

@router.get("/downloads/{filename}")
async def download_file(filename: str, current_user: User = Depends(get_current_user)):
    """
    Endpoint seguro para download de arquivos.
    Apenas usuários autenticados (token válido) podem baixar.
    """
    # Lista de arquivos permitidos para evitar Path Traversal
    ALLOWED_FILES = {
        "dossie_pl2338.pdf": "Dossiê PL 2338",
        "playbook_governanca.pdf": "Playbook de Governança",
        "mapa_riscos_iso.xlsx": "Mapa de Riscos (Planilha)"
    }

    if filename not in ALLOWED_FILES:
        raise HTTPException(status_code=404, detail="Arquivo não encontrado ou acesso não permitido.")

    file_path = os.path.join(PROTECTED_FILES_DIR, filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Arquivo não encontrado no servidor.")

    return FileResponse(
        path=file_path, 
        filename=filename, 
        media_type='application/pdf'
    )
