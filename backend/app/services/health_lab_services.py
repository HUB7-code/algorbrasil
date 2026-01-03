import re
from typing import List, Dict, Any
from pydantic import BaseModel

# --- SCHEMAS ---

class ShadowScanResult(BaseModel):
    risk_score: int # 0-100
    entities_detected: List[Dict[str, Any]] # [{'type': 'CRM', 'value': 'CRM/SP 12345', 'start': 0, 'end': 10}]
    sanitized_text: str
    risk_level: str

class ISOAssessmentRequest(BaseModel):
    answers: Dict[str, str] # { "q1": "yes", "q2": "partial" }

class ISOAssessmentResult(BaseModel):
    score: int
    maturity_level: str
    breakdown: Dict[str, int] # Score por categoria
    recommendations: List[str]

# --- SERVICES ---

class ShadowAIService:
    
    PATTERNS = {
        "CRM_MEDICO": r"(?i)(?:CRM|CRM\/[A-Z]{2})\s?:?\s?(\d{4,8})",
        "CID_10": r"[A-Z]\d{2}(?:\.\d)?",
        "CPF": r"\d{3}\.?\d{3}\.?\d{3}-?\d{2}",
        "EMAIL": r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+",
        "PHONE": r"\(?\d{2}\)?\s?\d{4,5}-?\d{4}"
    }

    @staticmethod
    def scan_text(text: str) -> ShadowScanResult:
        entities = []
        risk_accumulated = 0
        
        # Scan patterns
        for label, pattern in ShadowAIService.PATTERNS.items():
            for match in re.finditer(pattern, text):
                entities.append({
                    "type": label,
                    "value": match.group(),
                    "start": match.start(),
                    "end": match.end()
                })
                # Pesos de Risco
                if label == "CRM_MEDICO": risk_accumulated += 25
                elif label == "CID_10": risk_accumulated += 20
                elif label == "CPF": risk_accumulated += 15
                else: risk_accumulated += 5

        # Sanitization (Redaction)
        sanitized = text
        # Ordenar reverso para não quebrar índices ao substituir
        for ent in sorted(entities, key=lambda x: x['start'], reverse=True):
            mask = "█" * len(ent['value'])
            sanitized = sanitized[:ent['start']] + mask + sanitized[ent['end']:]

        # Score Normalization
        score = min(100, risk_accumulated)
        
        if score >= 80: level = "CRITICAL"
        elif score >= 40: level = "HIGH"
        elif score > 0: level = "MODERATE"
        else: level = "LOW"

        return ShadowScanResult(
            risk_score=score,
            entities_detected=entities,
            sanitized_text=sanitized,
            risk_level=level
        )

class ISOService:
    # Pesos definidos na Spec
    QUESTIONS_WEIGHTS = {
        "q1": {"weight": 3, "category": "Governança"},
        "q2": {"weight": 5, "category": "Transparência"},
        "q3": {"weight": 4, "category": "Dados"},
        "q4": {"weight": 3, "category": "Segurança"},
        "q5": {"weight": 5, "category": "Privacidade"}
    }
    
    MAX_WEIGHT = sum(q["weight"] for q in QUESTIONS_WEIGHTS.values()) * 1.0 # * 1.0 para float se 'yes' = 1.0

    @staticmethod
    def evaluate(answers: Dict[str, str]) -> ISOAssessmentResult:
        total_score = 0.0
        
        # Logic: yes=1.0, partial=0.5, no=0.0
        multipliers = {"yes": 1.0, "partial": 0.5, "no": 0.0}
        
        for q_id, q_data in ISOService.QUESTIONS_WEIGHTS.items():
            answer = answers.get(q_id, "no")
            points = q_data["weight"] * multipliers.get(answer, 0.0)
            total_score += points

        # Normalize to 0-100
        final_percentage = int((total_score / ISOService.MAX_WEIGHT) * 100)
        
        if final_percentage >= 90: maturity = "LÍDER (Optimized)"
        elif final_percentage >= 70: maturity = "GERENCIADO (Managed)"
        elif final_percentage >= 40: maturity = "DEFINIDO (Defined)"
        else: maturity = "INICIAL (Ad-hoc)"

        recs = []
        if final_percentage < 100:
            recs.append("Implementar logs de auditoria automatizada (XAI).")
        if answers.get("q5") != "yes":
            recs.append("Urgente: Formalizar base legal no RIPD para dados sensíveis.")

        return ISOAssessmentResult(
            score=final_percentage,
            maturity_level=maturity,
            breakdown={"Total": final_percentage}, # Simplificado por agora
            recommendations=recs
        )
