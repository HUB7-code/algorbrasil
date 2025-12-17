from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.db.session import Base

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Metadados da Avaliação
    title = Column(String, default="Avaliação de Maturidade ISO 42001")
    status = Column(String, default="in_progress") # in_progress, completed, archived
    score_total = Column(Integer, default=0) # 0 a 100
    
    # O "Coração" do Diagnóstico: Salva as respostas como JSON flexível
    # Ex: {"q1": "yes", "q2": "partial", "risk_level": "high"}
    answers_payload = Column(JSON) 
    
    # Relatório Gerado (Resumo textual ou HTML)
    report_summary = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relacionamentos
    owner = relationship("backend.app.models.user.User", back_populates="assessments")
    
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    organization = relationship("backend.app.models.organization.Organization")
