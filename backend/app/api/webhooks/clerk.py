from fastapi import APIRouter, Request, HTTPException, Depends
from svix.webhooks import Webhook, WebhookVerificationError
from backend.app.core.config import settings
from backend.app.db.session import get_db
from sqlalchemy.orm import Session
from backend.app.models.user import User
from backend.app.models.organization import Organization, organization_members
from sqlalchemy import insert
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/clerk")
async def clerk_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Recebe eventos em tempo real do Clerk (Ex: user.created).
    Usa o Svix para verificar a assinatura e garantir que a payload veio mesmo do Clerk.
    """
    if not settings.CLERK_WEBHOOK_SECRET:
        logger.error("CLERK_WEBHOOK_SECRET não configurado!")
        raise HTTPException(status_code=500, detail="Webhook config error")

    # 1. Pegar headers do Svix enviados pelo Clerk
    headers = request.headers
    svix_id = headers.get("svix-id")
    svix_timestamp = headers.get("svix-timestamp")
    svix_signature = headers.get("svix-signature")

    if not svix_id or not svix_timestamp or not svix_signature:
        raise HTTPException(status_code=400, detail="Faltam headers Svix")

    # 2. Pegar o body raw como string para a verificação criptográfica
    payload = await request.body()
    
    # 3. Inicializar o verificador Svix e validar
    wh = Webhook(settings.CLERK_WEBHOOK_SECRET)
    
    try:
        # verify() retorna o dict do JSON já validado se a assinatura bater
        event = wh.verify(payload, headers)
    except WebhookVerificationError as e:
        logger.warning(f"⚠️ Assinatura de Webhook Inválida: {e}")
        raise HTTPException(status_code=400, detail="Assinatura inválida")

    # 4. Processar o Evento (Identity Sync)
    event_type = event.get("type")
    data = event.get("data", {})
    
    clerk_id = data.get("id")
    
    # Evento: Novo Usuário Criado no Clerk
    if event_type == "user.created":
        logger.info(f"🚀 Iniciando Sync de novo usuário Clerk: {clerk_id}")
        
        # O Clerk salva emails numa lista. Pegamos o principal.
        email_addresses = data.get("email_addresses", [])
        primary_email = ""
        if email_addresses:
            primary_email = email_addresses[0].get("email_address", "")
            
        first_name = data.get("first_name") or ""
        last_name = data.get("last_name") or ""
        full_name = f"{first_name} {last_name}".strip()
        
        # Verificar se já existe por segurança (Idempotência)
        existing_user = db.query(User).filter(User.clerk_id == clerk_id).first()
        if existing_user:
            logger.info("Usuário já existe. Ignorando.")
            return {"success": True, "message": "Ignorado"}
            
        # O email pode já existir na base ALGOR antiga (migração parcial)
        user_by_email = db.query(User).filter(User.email == primary_email).first()
        
        if user_by_email:
            # Usuário antigo fazendo login pelo Clerk pela primeira vez -> Apenas vinculamos
            user_by_email.clerk_id = clerk_id
            db.commit()
            logger.info(f"🔄 Conta antiga vinculada ao Clerk_ID: {clerk_id}")
            return {"success": True, "action": "linked"}
            
        # Criação de usuário totalmente novo
        new_user = User(
            clerk_id=clerk_id,
            email=primary_email,
            full_name=full_name,
            role="subscriber",
            is_active=True,  # O Clerk já garantiu que o email é válido
            is_totp_enabled=False 
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        # Criar Organização Pessoal Default IMEDIATAMENTE (Igual fazíamos no signup.py)
        try:
            default_org_name = f"Org de {first_name}" if first_name else "Minha Organização"
            new_org = Organization(
                name=default_org_name,
                owner_id=new_user.id,
                plan_tier="free",
                credits_balance=3 # 3 Créditos de Demo
            )
            db.add(new_org)
            db.commit()
            db.refresh(new_org)
            
            # Linkar como Owner
            stmt = insert(organization_members).values(
                user_id=new_user.id,
                organization_id=new_org.id,
                role="owner"
            )
            db.execute(stmt)
            db.commit()
            logger.info(f"✅ Nova Conta Sincronizada com Org Default: {clerk_id}")
            
        except Exception as e_org:
            logger.warning(f"⚠️ Erro ao criar Org pelo Webhook: {e_org}")

    elif event_type == "user.updated":
        # Se usuário mudar nome/email lá, atualizamos aqui
        logger.info(f"🔄 Sync de Update para Clerk: {clerk_id}")
        user = db.query(User).filter(User.clerk_id == clerk_id).first()
        if user:
            first_name = data.get("first_name") or ""
            last_name = data.get("last_name") or ""
            user.full_name = f"{first_name} {last_name}".strip()
            db.commit()

    elif event_type == "user.deleted":
        # Estratégia: Inativar (Soft Delete)
        logger.info(f"🗑️ Sync de Delete para Clerk: {clerk_id}")
        user = db.query(User).filter(User.clerk_id == clerk_id).first()
        if user:
            user.is_active = False
            db.commit()

    return {"success": True}
