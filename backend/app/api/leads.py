from fastapi import APIRouter, Depends, HTTPException, Query, Request, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from typing import Optional, List
from datetime import datetime, timedelta

from backend.app.db.session import get_db
from backend.app.models.lead import Lead, LeadStatus, LeadPriority, FunnelStage
from backend.app.schemas.lead import (
    LeadCreateDiagnostic,
    LeadCreateSpecialist,
    LeadCreateScanner,
    LeadUpdate,
    LeadResponse,
    LeadListResponse,
    LeadStats
)

router = APIRouter(prefix="/leads", tags=["Leads"])

# === Funções de cálculo de score ===

def calculate_lead_score(data: dict) -> int:
    """
    Calcula o score do lead baseado nos dados de qualificação.
    Score máximo: 100
    """
    score = 0
    
    # Cargo (máx 30 pontos)
    role_scores = {
        'cto': 30, 'ceo': 30, 'dpo': 30,
        'pm': 20,
        'dev': 10,
        'other': 5
    }
    score += role_scores.get(data.get('role', ''), 5)
    
    # Tamanho da empresa (máx 25 pontos)
    size_scores = {
        '1000+': 25,
        '201-1000': 20,
        '51-200': 15,
        '10-50': 10
    }
    score += size_scores.get(data.get('company_size', ''), 5)
    
    # Volume de IA (máx 25 pontos)
    volume_scores = {
        '1M+': 25,
        '100k-1M': 20,
        '10k-100k': 15,
        '<10k': 10
    }
    score += volume_scores.get(data.get('ai_volume', ''), 5)
    
    # Urgência (máx 20 pontos)
    urgency_scores = {
        'urgent': 20,
        'planning': 15,
        'exploring': 5
    }
    score += urgency_scores.get(data.get('urgency', ''), 5)
    
    return min(score, 100)

def determine_priority(score: int) -> str:
    """Determina a prioridade baseado no score"""
    if score >= 80:
        return LeadPriority.HOT.value
    elif score >= 50:
        return LeadPriority.WARM.value
    elif score >= 30:
        return LeadPriority.COLD.value
    else:
        return LeadPriority.NURTURE.value

# === Endpoints Públicos (Criação de Leads) ===

@router.post("/diagnostic", response_model=LeadResponse, status_code=201)
async def create_diagnostic_lead(
    lead_data: LeadCreateDiagnostic,
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    ESTÁGIO 2 - MEIO DE FUNIL
    Cria lead a partir do formulário de Diagnóstico Técnico
    """
    # Verificar se já existe lead com esse email
    existing = db.query(Lead).filter(Lead.email == lead_data.email).first()
    if existing:
        # Atualizar lead existente com novos dados
        existing.name = lead_data.name
        existing.company = lead_data.company
        existing.ai_providers = lead_data.ai_providers
        existing.pain_points = lead_data.pain_points
        existing.source = lead_data.source
        existing.funnel_stage = FunnelStage.MID.value
        existing.lead_type = "diagnostic_request"
        existing.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(existing)
        
        # [EMAIL] Notificar Admin + Confirmação Usuário (Mesmo atualizando, é bom avisar)
        try:
            from backend.app.services.email_service import send_admin_alert, send_new_lead_confirmation
            background_tasks.add_task(
                send_admin_alert,
                f"Lead Atualizado (Diagnóstico): {existing.email}",
                lead_data.model_dump()
            )
            background_tasks.add_task(
                send_new_lead_confirmation,
                existing.name,
                existing.email,
                "Diagnostic"
            )
        except Exception as e:
            print(f"Erro ao agendar emails: {e}")

        return existing
    
    # Criar novo lead
    new_lead = Lead(
        name=lead_data.name,
        email=lead_data.email,
        company=lead_data.company,
        ai_providers=lead_data.ai_providers,
        pain_points=lead_data.pain_points,
        source=lead_data.source,
        funnel_stage=FunnelStage.MID.value,
        lead_type="diagnostic_request",
        lead_score=30,  # Score base para meio de funil
        priority=LeadPriority.WARM.value,
        ip_address=request.client.host if request.client else None
    )
    
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    
    # [EMAIL] Notificar Admin + Confirmação Usuário
    try:
        from backend.app.services.email_service import send_admin_alert, send_new_lead_confirmation
        background_tasks.add_task(
            send_admin_alert,
            f"Novo Lead (Diagnóstico): {new_lead.email}",
            lead_data.model_dump()
        )
        background_tasks.add_task(
            send_new_lead_confirmation,
            new_lead.name,
            new_lead.email,
            "Diagnostic"
        )
    except Exception as e:
        print(f"Erro ao agendar emails: {e}")
    
    return new_lead

@router.post("/specialist", response_model=LeadResponse, status_code=201)
async def create_specialist_lead(
    lead_data: LeadCreateSpecialist,
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    ESTÁGIO 3 - FUNDO DE FUNIL
    Cria lead a partir do formulário "Falar com Especialista"
    """
    # Calcular score
    score_data = {
        'role': lead_data.role,
        'company_size': lead_data.company_size,
        'ai_volume': lead_data.ai_volume,
        'urgency': lead_data.urgency
    }
    lead_score = calculate_lead_score(score_data)
    priority = determine_priority(lead_score)
    
    # Verificar se já existe
    existing = db.query(Lead).filter(Lead.email == lead_data.email).first()
    if existing:
        # Atualizar para fundo de funil (upgrade)
        existing.name = lead_data.name
        existing.phone = lead_data.phone
        existing.company = lead_data.company
        existing.role = lead_data.role
        existing.company_size = lead_data.company_size
        existing.ai_volume = lead_data.ai_volume
        existing.urgency = lead_data.urgency
        existing.contact_time = lead_data.contact_time
        existing.comments = lead_data.comments
        existing.source = lead_data.source
        existing.funnel_stage = FunnelStage.BOTTOM.value
        existing.lead_type = "specialist_contact"
        existing.lead_score = lead_score
        existing.priority = priority
        existing.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(existing)
        
        # [EMAIL]
        try:
            from backend.app.services.email_service import send_admin_alert, send_new_lead_confirmation
            background_tasks.add_task(
                send_admin_alert,
                f"Lead UPGRADE (Especialista): {existing.email}",
                lead_data.model_dump()
            )
            background_tasks.add_task(
                send_new_lead_confirmation,
                existing.name,
                existing.email,
                "Specialist"
            )
        except Exception as e:
            print(f"Erro ao agendar emails: {e}")

        return existing
    
    # Criar novo lead
    new_lead = Lead(
        name=lead_data.name,
        email=lead_data.email,
        phone=lead_data.phone,
        company=lead_data.company,
        role=lead_data.role,
        company_size=lead_data.company_size,
        ai_volume=lead_data.ai_volume,
        urgency=lead_data.urgency,
        contact_time=lead_data.contact_time,
        comments=lead_data.comments,
        source=lead_data.source,
        funnel_stage=FunnelStage.BOTTOM.value,
        lead_type="specialist_contact",
        lead_score=lead_score,
        priority=priority,
        ip_address=request.client.host if request.client else None
    )
    
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    
    # [EMAIL]
    try:
        from backend.app.services.email_service import send_admin_alert, send_new_lead_confirmation
        background_tasks.add_task(
            send_admin_alert,
            f"Novo Lead (Especialista): {new_lead.email}",
            lead_data.model_dump()
        )
        background_tasks.add_task(
            send_new_lead_confirmation,
            new_lead.name,
            new_lead.email,
            "Specialist"
        )
    except Exception as e:
        print(f"Erro ao agendar emails: {e}")
    
    return new_lead

@router.post("/scanner", response_model=LeadResponse, status_code=201)
async def create_scanner_lead(
    lead_data: LeadCreateScanner,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    ESTÁGIO 1 - TOPO DE FUNIL
    Cria lead a partir do Scanner Freemium
    """
    existing = db.query(Lead).filter(Lead.email == lead_data.email).first()
    if existing:
        return existing  # Retorna existente sem erro
    
    new_lead = Lead(
        name="",  # Será preenchido depois
        email=lead_data.email,
        source=lead_data.source,
        funnel_stage=FunnelStage.TOP.value,
        lead_type="scanner_trial",
        lead_score=10,  # Score mínimo
        priority=LeadPriority.NURTURE.value,
        ip_address=request.client.host if request.client else None
    )
    
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    
    return new_lead

# === Endpoints Admin (Requerem autenticação) ===

@router.get("/", response_model=LeadListResponse)
async def list_leads(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    status: Optional[str] = None,
    priority: Optional[str] = None,
    funnel_stage: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Lista todos os leads com paginação e filtros.
    Requer autenticação de admin.
    """
    query = db.query(Lead)
    
    # Aplicar filtros
    if status:
        query = query.filter(Lead.status == status)
    if priority:
        query = query.filter(Lead.priority == priority)
    if funnel_stage:
        query = query.filter(Lead.funnel_stage == funnel_stage)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Lead.name.ilike(search_term)) |
            (Lead.email.ilike(search_term)) |
            (Lead.company.ilike(search_term))
        )
    
    # Ordenar por mais recentes
    query = query.order_by(Lead.created_at.desc())
    
    # Contagem total
    total = query.count()
    
    # Paginação
    offset = (page - 1) * per_page
    items = query.offset(offset).limit(per_page).all()
    
    return LeadListResponse(
        items=items,
        total=total,
        page=page,
        per_page=per_page,
        pages=(total + per_page - 1) // per_page
    )

@router.get("/stats", response_model=LeadStats)
async def get_lead_stats(db: Session = Depends(get_db)):
    """
    Retorna estatísticas de leads para o dashboard admin.
    """
    now = datetime.utcnow()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=now.weekday())
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    total = db.query(Lead).count()
    new = db.query(Lead).filter(Lead.status == LeadStatus.NEW.value).count()
    contacted = db.query(Lead).filter(Lead.status == LeadStatus.CONTACTED.value).count()
    qualified = db.query(Lead).filter(Lead.status == LeadStatus.QUALIFIED.value).count()
    converted = db.query(Lead).filter(Lead.status == LeadStatus.CONVERTED.value).count()
    hot = db.query(Lead).filter(Lead.priority == LeadPriority.HOT.value).count()
    warm = db.query(Lead).filter(Lead.priority == LeadPriority.WARM.value).count()
    
    today = db.query(Lead).filter(Lead.created_at >= today_start).count()
    week = db.query(Lead).filter(Lead.created_at >= week_start).count()
    month = db.query(Lead).filter(Lead.created_at >= month_start).count()
    
    conversion_rate = (converted / total * 100) if total > 0 else 0
    
    return LeadStats(
        total_leads=total,
        new_leads=new,
        contacted_leads=contacted,
        qualified_leads=qualified,
        converted_leads=converted,
        hot_leads=hot,
        warm_leads=warm,
        conversion_rate=round(conversion_rate, 2),
        leads_today=today,
        leads_this_week=week,
        leads_this_month=month
    )

@router.get("/{lead_id}", response_model=LeadResponse)
async def get_lead(lead_id: int, db: Session = Depends(get_db)):
    """Retorna detalhes de um lead específico."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    return lead

@router.patch("/{lead_id}", response_model=LeadResponse)
async def update_lead(
    lead_id: int,
    lead_update: LeadUpdate,
    db: Session = Depends(get_db)
):
    """Atualiza um lead (status, prioridade, notas, etc.)"""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    
    update_data = lead_update.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        if value is not None:
            # Converter enum para string se necessário
            if hasattr(value, 'value'):
                value = value.value
            setattr(lead, field, value)
    
    # Se marcado como contactado, registrar data
    if lead_update.status == LeadStatus.CONTACTED and not lead.contacted_at:
        lead.contacted_at = datetime.utcnow()
    
    # Se convertido, registrar data
    if lead_update.status == LeadStatus.CONVERTED and not lead.converted_at:
        lead.converted_at = datetime.utcnow()
    
    lead.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(lead)
    
    return lead

@router.delete("/{lead_id}", status_code=204)
async def delete_lead(lead_id: int, db: Session = Depends(get_db)):
    """Remove um lead (LGPD compliance)."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    
    db.delete(lead)
    db.commit()
    
    return None
