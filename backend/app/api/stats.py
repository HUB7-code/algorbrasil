from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import User

router = APIRouter()

@router.get("/stats/public")
async def get_public_stats(db: Session = Depends(get_db)):
    """
    Retorna estatísticas públicas para exibir no site.
    """
    # Conta o número real de usuários na base
    count = db.query(User).count()
    
    return {
        "members_count": count
    }
