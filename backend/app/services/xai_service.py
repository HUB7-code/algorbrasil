import pandas as pd
import io
import re
import time
from typing import BinaryIO
from backend.app.schemas.lab import XAIAuditResult

class XAIService:
    
    CRITICAL_PATTERNS = {
        "SHAP Values": r"^(shap_|values_shap|contribution_)",
        "LIME Weights": r"^(lime_|exp_|weight_)",
        "Confidence Intervals": r"(confidence|interval|std_err|uncertainty)",
        "Native Probabilities": r"(proba|score|prediction_raw)"
    }

    RISK_PATTERNS = {
        "Obfuscated Features": r"^(f\d+|var_\d+|feat_\d+|v\d+)$", # ex: f1, var_23
    }

    @staticmethod
    def audit_file(file_content: bytes, filename: str) -> XAIAuditResult:
        start_time = time.time()
        
        # 1. Carregar em Memória (Zero Retention)
        try:
            if filename.endswith('.csv'):
                df = pd.read_csv(io.BytesIO(file_content), nrows=50) # Lê apenas header e primeiras linhas p/ performance
            elif filename.endswith('.json'):
                df = pd.read_json(io.BytesIO(file_content))
            else:
                # Tenta CSV como fallback
                df = pd.read_csv(io.BytesIO(file_content), nrows=50)
        except Exception as e:
            raise ValueError(f"Formato de arquivo inválido ou corrompido: {str(e)}")

        columns = df.columns.tolist()
        
        # 2. Análise de Padrões
        score = 20 # Base Score (Ceticismo Padrão)
        detected_methods = []
        missing_components = []
        
        # Bonificações (Compliant)
        has_xai = False
        for name, pattern in XAIService.CRITICAL_PATTERNS.items():
            matches = [col for col in columns if re.search(pattern, col, re.IGNORECASE)]
            if matches:
                score += 25 if "SHAP" in name or "LIME" in name else 15
                detected_methods.append(name)
                has_xai = True
            else:
                missing_components.append(name)

        # Penalidades (Black Box)
        obfuscated_count = 0
        for col in columns:
            if re.search(XAIService.RISK_PATTERNS["Obfuscated Features"], col, re.IGNORECASE):
                obfuscated_count += 1
        
        if obfuscated_count > 0:
            penalty = min(30, obfuscated_count * 2) # Teto de 30 pontos de penalidade
            score -= penalty
            if penalty > 10:
                missing_components.append(f"Alta Ofuscação detectada ({obfuscated_count} colunas genéricas)")

        # Normalização do Score (0-100)
        score = max(0, min(100, score))

        # 3. Determinação de Risco
        if score >= 80:
            risk = "LOW"
            verdict = "MODELO AUDITÁVEL. Evidências de explicabilidade técnica encontradas."
        elif score >= 50:
            risk = "MODERATE"
            verdict = "TRANSPARÊNCIA PARCIAL. Faltam componentes críticos de auditoria (SHAP/LIME)."
        else:
            risk = "CRITICAL"
            verdict = "CAIXA-PRETA DETECTADA. Alto risco jurídico. Ausência de vetores de explicabilidade."

        processing_time = (time.time() - start_time) * 1000

        return XAIAuditResult(
            score=score,
            risk_level=risk,
            verdict=verdict,
            transparency_metrics={
                "total_columns_scanned": len(columns),
                "entropy_flag": obfuscated_count > 5
            },
            detected_explainability_methods=detected_methods,
            missing_critical_components=missing_components,
            columns_sample=columns[:10],
            processing_time_ms=processing_time
        )
