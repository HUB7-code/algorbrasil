import re
from typing import List, Tuple, Dict, Any

class AnalysisEngine:
    """
    Central Intelligence for Compliance Scanning.
    Shared by:
    1. Real-time Guardrail API (Enterprise)
    2. File Scanner (Freemium/Audit)
    """
    
    # --- REGEX PATTERNS ---
    # Brazilian CPF
    CPF_PATTERN = r'\b\d{3}\.\d{3}\.\d{3}-\d{2}\b'
    # Simple Email
    EMAIL_PATTERN = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    # Credit Card (Visa/Master - simplificado)
    CREDIT_CARD_PATTERN = r'\b(?:\d{4}[- ]?){3}\d{4}\b'
    
    # --- PROMPT INJECTION PATTERNS (OWASP LLM01) ---
    INJECTION_KEYWORDS = [
        "ignore previous instructions", 
        "ignore all instructions",
        "system prompt", 
        "jailbreak", 
        "dan mode", 
        "developer mode", 
        "desconsidere as instruções", 
        "modo desenvolvedor", 
        "fale como se fosse",
        "act as a",
        "do anything now"
    ]
    
    @staticmethod
    def scan_pii(text: str) -> List[Dict[str, Any]]:
        """
        Scans text for Personally Identifiable Information (PII).
        Returns a list of detected entities.
        """
        matches = []
        
        # 1. CPF
        cpfs = re.findall(AnalysisEngine.CPF_PATTERN, text)
        for cpf in cpfs:
            matches.append({
                "type": "CPF",
                "value": cpf, # In prod, maybe mask this
                "severity": "CRITICAL"
            })
            
        # 2. Email
        emails = re.findall(AnalysisEngine.EMAIL_PATTERN, text)
        for email in emails:
             matches.append({
                "type": "EMAIL",
                "value": email,
                "severity": "MEDIUM"
            })
            
        # 3. Credit Card
        cards = re.findall(AnalysisEngine.CREDIT_CARD_PATTERN, text)
        for card in cards:
             matches.append({
                "type": "CREDIT_CARD",
                "value": card, # MUST MASK
                "severity": "CRITICAL"
            })
            
        return matches

    @staticmethod
    def scan_injection(text: str) -> List[Dict[str, Any]]:
        """
        Scans text for Prompt Injection patterns.
        """
        findings = []
        text_lower = text.lower()
        
        for keyword in AnalysisEngine.INJECTION_KEYWORDS:
            if keyword in text_lower:
                findings.append({
                    "type": "PROMPT_INJECTION",
                    "term": keyword,
                    "severity": "HIGH"
                })
        return findings

    @staticmethod
    def calculate_risk_score(pii_count: int, injection_count: int) -> float:
        """
        Calculates a normalized risk score (0.0 to 1.0).
        """
        base_risk = 0.0
        
        if pii_count > 0:
            base_risk += 0.4 + (pii_count * 0.1)
            
        if injection_count > 0:
            base_risk += 0.8
            
        return min(base_risk, 0.99) # Cap at 0.99
    
    @staticmethod
    def analyze_text(text: str) -> Dict[str, Any]:
        """
        Full analysis wrapper.
        """
        pii = AnalysisEngine.scan_pii(text)
        injection = AnalysisEngine.scan_injection(text)
        score = AnalysisEngine.calculate_risk_score(len(pii), len(injection))
        
        verdict = "ALLOWED"
        if score > 0.8:
            verdict = "BLOCKED"
        elif score > 0.4:
            verdict = "FLAGGED"
            
        return {
            "pii_detected": len(pii) > 0,
            "pii_details": pii,
            "injection_detected": len(injection) > 0,
            "injection_details": injection,
            "risk_score": score,
            "verdict": verdict
        }
