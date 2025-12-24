from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List, Dict
import json
import csv
import io
import re

from backend.app.schemas.scanner import ScanResult, Finding

router = APIRouter()

# --- REGEX PATTERNS ---
CPF_PATTERN = r'\b\d{3}\.\d{3}\.\d{3}-\d{2}\b'
EMAIL_PATTERN = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
INJECTION_KEYWORDS = [
    "ignore previous instructions", "system prompt", "jailbreak", "DAN mode", 
    "desconsidere as instruções", "modo desenvolvedor", "fale como se fosse"
]

@router.post("/upload", response_model=ScanResult)
async def scan_upload(file: UploadFile = File(...)):
    """
    Endpoint Público para Scanner Freemium (LGPD + OWASP)
    Aceita arquivos CSV ou JSON. Limite de 100 linhas processadas.
    """
    from backend.app.services.analysis_engine import AnalysisEngine
    
    # 1. Validar Tipo e Ler Conteúdo
    content_type = file.content_type
    filename = file.filename.lower()
    
    rows: List[str] = []
    
    try:
        content = await file.read()
        text_content = content.decode('utf-8')
        
        if filename.endswith('.json') or 'json' in content_type:
            data = json.loads(text_content)
            if isinstance(data, list):
                # Extrair strings de objetos
                for item in data:
                    rows.append(json.dumps(item))
            elif isinstance(data, dict):
                 rows.append(json.dumps(data))
                 
        elif filename.endswith('.csv') or 'csv' in content_type:
             csv_file = io.StringIO(text_content)
             reader = csv.reader(csv_file)
             for row in reader:
                 rows.append(" ".join(row))
        else:
             # Tenta tratar como texto plano/linhas
             rows = text_content.splitlines()
             
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao processar arquivo: {str(e)}")

    # 2. Limitar (Freemium)
    total_received = len(rows)
    if len(rows) > 100:
        rows = rows[:100]
        
    # 3. Analisar (Using Shared Engine)
    findings: List[Finding] = []
    lgpd_hits = 0
    security_hits = 0
    
    for idx, row_text in enumerate(rows):
        analysis = AnalysisEngine.analyze_text(row_text)
        
        # A. Process PII
        if analysis["pii_detected"]:
            for item in analysis["pii_details"]:
                findings.append(Finding(
                    category="LGPD",
                    severity=item["severity"],
                    description=f"{item['type']} detectado: {item['value'][:4]}...",
                    regulatory_ref="LGPD Art. 5 (PII)",
                    # Fine calc mult (simulation)
                    estimated_fine=50000.0 if item['severity'] == "CRITICAL" else 1000.0,
                    row_index=idx
                ))
                lgpd_hits += 1

        # B. Process Injection
        if analysis["injection_detected"]:
             for item in analysis["injection_details"]:
                 findings.append(Finding(
                    category="SEGURANCA",
                    severity=item["severity"],
                    description=f"Padrão de Prompt Injection: '{item['term']}'",
                    regulatory_ref="OWASP LLM01",
                    estimated_fine=0.0,
                    row_index=idx
                ))
                 security_hits += 1
                 
    # 4. Calcular Scores
    # 100 base, penalize log
    lgpd_score = max(0.0, 100.0 - (lgpd_hits * 15))
    owasp_score = max(0.0, 100.0 - (security_hits * 25))
    
    # Operational Heuristic: If extremely short or empty, low operational quality
    operational_score = 100.0
    empty_lines = sum(1 for r in rows if len(r.strip()) < 5)
    if len(rows) > 0:
        operational_score -= (empty_lines / len(rows)) * 50
    
    return ScanResult(
        total_rows=total_received,
        risks_found=len(findings),
        lgpd_score=round(lgpd_score, 1),
        operational_score=round(operational_score, 1),
        owasp_score=round(owasp_score, 1),
        findings=findings
    )
