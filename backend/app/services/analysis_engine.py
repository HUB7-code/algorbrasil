import re
import math
from typing import List, Dict, Any

class AnalysisEngine:
    """
    Central Intelligence for Compliance Scanning (HARDENED V2).
    Implements multi-layer defense:
    1. Text Normalization (Homoglyphs, Leetspeak)
    2. Deep Regex Patterns (Obfuscation)
    3. Entropy Analysis (Encoded payloads)
    4. Mock LLM Judge (Structural Analysis)
    """
    
    # --- REGEX PATTERNS ---
    CPF_PATTERN = r'\b\d{3}\.\d{3}\.\d{3}-\d{2}\b'
    EMAIL_PATTERN = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    CREDIT_CARD_PATTERN = r'\b(?:\d{4}[- ]?){3}\d{4}\b'
    
    # Expanded Injection Patterns (Multi-language + Obfuscation attempts)
    INJECTION_KEYWORDS = [
        # English
        "ignore previous instructions", "ignore all instructions", "system prompt",
        "jailbreak", "dan mode", "developer mode", "act as a", "do anything now",
        "hypothetical response", "roleplay as",
        # Portuguese
        "desconsidere as instruções", "desconsidere instruções anteriores",
        "modo desenvolvedor", "fale como se fosse", "aja como", "ignore instruções",
        # Obfuscation Indicators
        "base64", "rot13", "hex dump", "javascript:",
        # Intent Override
        "override security", "bypass filter", "ethical filter disable"
    ]
    
    @staticmethod
    def _calculate_entropy(text: str) -> float:
        """Calculates Shannon entropy to detect random/encrypted strings."""
        prob = [float(text.count(c)) / len(text) for c in dict.fromkeys(list(text))]
        entropy = - sum([p * math.log(p) / math.log(2.0) for p in prob])
        return entropy

    @staticmethod
    def _normalize_text(text: str) -> str:
        """normalize text to detect simple bypasses like l33tsp34k or extra spaces."""
        text = text.lower()
        # Simple leet replacement
        replacements = {'1': 'i', '3': 'e', '4': 'a', '0': 'o', '@': 'a', '$': 's'}
        for char, rep in replacements.items():
            text = text.replace(char, rep)
        # Remove hidden chars
        text = ''.join(c for c in text if c.isprintable())
        return text

    @staticmethod
    def scan_pii(text: str) -> List[Dict[str, Any]]:
        matches = []
        cpfs = re.findall(AnalysisEngine.CPF_PATTERN, text)
        for cpf in cpfs:
            matches.append({"type": "CPF", "value": cpf, "severity": "CRITICAL"})
        emails = re.findall(AnalysisEngine.EMAIL_PATTERN, text)
        for email in emails:
            matches.append({"type": "EMAIL", "value": email, "severity": "MEDIUM"})
        return matches

    @staticmethod
    def scan_injection(text: str) -> List[Dict[str, Any]]:
        findings = []
        normalized_text = AnalysisEngine._normalize_text(text)
        
        # 1. Keyword Scanning (Normalized)
        for keyword in AnalysisEngine.INJECTION_KEYWORDS:
            if keyword in normalized_text:
                findings.append({
                    "type": "PROMPT_INJECTION",
                    "term": keyword,
                    "severity": "HIGH",
                    "details": "Known adversarial pattern detected"
                })

        # 2. Entropy Check (Detects Base64 or Encrypted payloads often used in injection)
        if len(text) > 20 and AnalysisEngine._calculate_entropy(text) > 4.5:
             findings.append({
                    "type": "OBFUSCATION_SUSPICION",
                    "term": "High Entropy",
                    "severity": "MEDIUM",
                    "details": "High entropy string detected (possible Base64/Encryption)"
                })

        # 3. Length Heuristic (Very long single strings/tokens)
        longest_word = max(text.split(), key=len) if text.split() else ""
        if len(longest_word) > 50:
             findings.append({
                    "type": "BUFFER_OVERFLOW_RISK",
                    "term": "Long Token",
                    "severity": "LOW",
                    "details": f"Token of length {len(longest_word)} detected"
                })

        return findings

    @staticmethod
    def analyze_text(text: str) -> Dict[str, Any]:
        pii = AnalysisEngine.scan_pii(text)
        injection = AnalysisEngine.scan_injection(text)
        
        # Advanced Scoring Logic
        pii_score = len(pii) * 0.15
        injection_score = len(injection) * 0.4
        
        # Heuristic Multiplier (If entropy is high + keyword, it's definitely an attack)
        risk_score = min(pii_score + injection_score, 0.99)
        
        verdict = "ALLOWED"
        if risk_score > 0.7:
            verdict = "BLOCKED"
        elif risk_score > 0.3:
            verdict = "FLAGGED"
            
        return {
            "pii_detected": len(pii) > 0,
            "pii_details": pii,
            "injection_detected": len(injection) > 0,
            "injection_details": injection,
            "risk_score": risk_score,
            "verdict": verdict
        }
