
from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey, Boolean, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.app.db.session import Base

class GovernanceTrace(Base):
    """
    EVIDENCE VAULT: Armazena logs imutáveis de interações de IA.
    Esta tabela é o coração da auditoria ISO 42001 (A.6.2.7 - Logging).
    """
    __tablename__ = "governance_traces"

    id = Column(Integer, primary_key=True, index=True)
    
    # Contexto Organizacional
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    ai_asset_id = Column(Integer, ForeignKey("ai_assets.id"), nullable=True) # Qual modelo gerou isso?

    # Integridade e Segurança
    trace_id = Column(String, unique=True, index=True, nullable=False) # UUID único da transação
    input_hash = Column(String, nullable=False) # SHA-256 do prompt (Não salvamos o prompt bruto por privacidade padrão)
    output_hash = Column(String, nullable=True) # SHA-256 da resposta

    # Guardrails Éticos (Veredito da ALGOR)
    verdict = Column(String, nullable=False) # ALLOWED, FLAGGED, BLOCKED
    policy_version = Column(String, nullable=False) # Qual versão da política estava ativa?
    risk_score = Column(Float, default=0.0) # 0.0 a 1.0 (Probabilidade de falha ética)
    
    # Detalhes da Auditoria
    pii_detected = Column(Boolean, default=False)
    topics_flagged = Column(JSON, nullable=True) # Ex: ["toxicity", "competitor_mention"]
    
    # Performance
    latency_ms = Column(Integer, nullable=True)
    Model_name = Column(String, nullable=True) # Ex: gpt-4-turbo

    # Trust Hub v5.1 - Hash Chaining
    previous_hash = Column(String, nullable=True, index=True) 
    block_hash = Column(String, nullable=True, unique=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)

class GovernancePolicy(Base):
    """
    Define um conjunto de regras de governança ativas para uma organização.
    """
    __tablename__ = "governance_policies"
    
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    name = Column(String, nullable=False) # ex: "Política Padrão 2025"
    description = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    version = Column(String, default="1.0")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    rules = relationship("GovernanceRule", back_populates="policy", cascade="all, delete-orphan")

class GovernanceRule(Base):
    """
    Regras granulares (Atomic Rules) que compõem uma política.
    Ex: Bloquear "Senha", Bloquear regex de CPF, etc.
    """
    __tablename__ = "governance_rules"
    
    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("governance_policies.id"), nullable=False)
    
    # keyword_precise, keyword_fuzzy, regex, pii_classifier
    rule_type = Column(String, nullable=False) 
    
    # O valor a ser buscado (ex: "senha", "concorrente_x")
    content = Column(String, nullable=False) 
    
    # BLOCK, FLAG, REDACT
    action = Column(String, default="BLOCK") 
    
    severity = Column(String, default="HIGH") # critical, high, medium, low
    is_active = Column(Boolean, default=True)
    
    policy = relationship("GovernancePolicy", back_populates="rules")
