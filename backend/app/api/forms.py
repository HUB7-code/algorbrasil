from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.contact import ContactLog
from backend.app.schemas_forms import NewsletterCreate, AssociationCreate

router = APIRouter()

# Simulação de envio de email
def send_email_notification(to_email: str, subject: str):
    # Futuro: Integrar com SendGrid/AWS SES
    print(f"📧 [EMAIL MOCK] Enviando para {to_email}: {subject}")

@router.post("/forms/newsletter")
async def subscribe_newsletter(
    data: NewsletterCreate, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Cadastra email na Newsletter.
    """
    # 1. Salvar no Banco
    contact = ContactLog(
        email=data.email,
        source="newsletter"
    )
    db.add(contact)
    db.commit()
    
    # 2. Enviar Email (Background Task para não travar a req)
    background_tasks.add_task(send_email_notification, data.email, "Bem-vindo à Algor Brasil!")
    
    return {"message": "Inscrição realizada com sucesso!"}

@router.post("/forms/association")
async def request_association(
    data: AssociationCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Recebe pedido de associação.
    """
    contact = ContactLog(
        name=data.nome,
        email=data.email,
        company=data.empresa,
        role=data.cargo,
        interest=data.interesse,
        message=data.mensagem,
        source="associacao"
    )
    db.add(contact)
    db.commit()
    
    background_tasks.add_task(send_email_notification, "contato@algor.com", f"Nova Associação: {data.nome}")
    
    return {"message": "Solicitação enviada com sucesso! Entraremos em contato."}

# ==========================================
# GESTÃO DE LEADS (ÁREA ADMINISTRATIVA)
# ==========================================
from backend.app.api.auth import get_current_user
from backend.app.models.user import User

@router.get("/forms/leads")
async def list_leads(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    [ADMIN] Lista todos os leads capturados (Newsletter e Associação).
    """
    # Verificação de Permissão (Apenas Admin)
    # Nota: Em produção, usar sistema de roles robusto, aqui simplificado.
    if current_user.role != "admin" and current_user.is_superuser is False:
        raise HTTPException(status_code=403, detail="Acesso negado. Apenas administradores.")
    
    contacts = db.query(ContactLog).order_by(ContactLog.created_at.desc()).all()
    return contacts

@router.get("/stats/public")
async def get_public_stats(db: Session = Depends(get_db)):
    """
    Retorna estatísticas públicas para o site (Contador de Membros).
    """
    # Contar usuários reais
    real_count = db.query(User).count()
    
    # Contar leads (newsletter + associação) - Opcional, mas mostra tração
    leads_count = db.query(ContactLog).count()
    
    # Número base para marketing (early stage) + crescimento real
    # Começamos com "100+" visualmente, então base_offset garante que nunca mostre "0"
    base_offset = 0
    
    return {
        "members_count": real_count,
        "leads_count": leads_count
    }
