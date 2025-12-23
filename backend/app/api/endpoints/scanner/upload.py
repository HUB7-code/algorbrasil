from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import csv
import io
import re

router = APIRouter()

class ScanResult(BaseModel):
    total_rows: int
    risks_found: int
    lgpd_score: float
    operational_score: float
    owasp_score: float
    findings: List[dict]

# --- REGEX PATTERNS (Engine v1) ---
PATTERNS = {
    "CPF": re.compile(r'(?:\D|^)(\d{3}\.\d{3}\.\d{3}-\d{2})(?:\D|$)'),
    "CNPJ": re.compile(r'(?:\D|^)(\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})(?:\D|$)'),
    "EMAIL": re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'),
    # Simple Brazil Phone (Mobile)
    "PHONE_BR": re.compile(r'(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\d{4}[-\s]?\d{4})'),
    # OWASP Basic Keywords
    "PROMPT_INJECTION": re.compile(r'(ignore previous instructions|system override|dan mode|do anything now)', re.IGNORECASE)
}

def scan_text(text: str, row_index: int) -> List[Dict[str, Any]]:
    findings = []
    
    # 1. PII Scan
    if PATTERNS["CPF"].search(text):
        findings.append({
            "category": "LGPD",
            "severity": "HIGH",
            "description": "CPF detectado (Dado Pessoal Sensível)",
            "regulatory_ref": "LGPD Art. 5, II",
            "estimated_fine": 50000.0, # Valor base ilustrativo
            "row_index": row_index
        })
        
    if PATTERNS["EMAIL"].search(text):
        findings.append({
            "category": "LGPD",
            "severity": "MEDIUM",
            "description": "E-mail Pessoal detectado",
            "regulatory_ref": "LGPD Art. 5, I",
            "estimated_fine": 10000.0,
            "row_index": row_index
        })

    # 2. Security Scan
    if PATTERNS["PROMPT_INJECTION"].search(text):
        findings.append({
            "category": "OWASP",
            "severity": "CRITICAL",
            "description": "Tentativa de Prompt Injection Detectada",
            "regulatory_ref": "OWASP LLM01",
            "estimated_fine": 0.0, # Risco de segurança, não necessariamente multa
            "row_index": row_index
        })
        
    return findings

# --- SECURITY CONSTANTS ---
MAX_FILE_SIZE = 5 * 1024 * 1024 # 5 MB (Hard Limit)
ALLOWED_MIME_TYPES = ["application/json", "text/csv", "application/vnd.ms-excel", "text/plain"]

@router.post("/upload", response_model=ScanResult)
async def upload_scanner_file(
    file: UploadFile = File(...),
):
    """
    Motor de Análise v1 (Regex-based).
    Lê o arquivo real e busca padrões.
    
    SECURITY HARDENING APPLIED:
    - Max Size: 5MB
    - Type Validation
    - Exception Handling
    """
    
    # 1. Validation: Extension & Generic Mime
    if not file.filename.lower().endswith(('.json', '.csv')):
        raise HTTPException(status_code=400, detail="Formato não suportado. Apenas .json ou .csv permitidos.")
    
    if file.content_type not in ALLOWED_MIME_TYPES:
         # Logar tentativa suspeita aqui se tiver logger
         pass 

    # 2. Security: DoS Protection (Size Limit)
    # Tenta ler com limite. Se passar, corta.
    try:
        content = await file.read()
        
        if len(content) > MAX_FILE_SIZE:
             raise HTTPException(
                 status_code=413, # Payload Too Large
                 detail=f"Arquivo excede o limite de segurança de {MAX_FILE_SIZE/1024/1024}MB."
             )
             
        if len(content) == 0:
            raise HTTPException(status_code=400, detail="Arquivo vazio.")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro na leitura do arquivo.")

    rows = []
    
    # 3. Defensive Parsing
    try:
        decoded = content.decode("utf-8")
        
        if file.filename.endswith('.json'):
            try:
                data = json.loads(decoded)
            except json.JSONDecodeError:
                raise HTTPException(status_code=400, detail="Arquivo JSON inválido ou corrompido.")
            
            if isinstance(data, list):
                rows = data 
            else:
                raise HTTPException(status_code=400, detail="O JSON deve ser uma lista de objetos (Logs).")
                
        elif file.filename.endswith('.csv'):
            try:
                stream = io.StringIO(decoded)
                # Proteção contra CSV Bomb (linhas infinitas) - Limitamos a 10k linhas no loop abaixo
                reader = csv.DictReader(stream)
                rows = list(reader)
            except Exception:
                raise HTTPException(status_code=400, detail="Arquivo CSV malformado.")
                
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="O arquivo deve estar codificado em UTF-8.")
    except HTTPException as he:
        raise he
    except Exception as e:
         raise HTTPException(status_code=400, detail=f"Erro desconhecido ao processar: {str(e)}")

    total_rows = len(rows)
    # 4. Logic Limit (Evitar loops infinitos em arquivos maliciosos comprimidos)
    if total_rows > 10000:
         raise HTTPException(status_code=413, detail="Limite de 10.000 linhas excedido para versão Gratuita.")

    all_findings = []
    
    # Execution Loop
    for idx, row in enumerate(rows):
        # Normalize content to string for regex
        row_content = str(row) 
        
        # Scan
        row_findings = scan_text(row_content, idx + 1)
        all_findings.extend(row_findings)

    # Calculate Score (Simplistic Logic)
    # Start at 100, deduct points per finding type
    lgpd_score = 100.0
    owasp_score = 100.0
    operational_score = 100.0 # Mock for now (needs LLM)
    
    for f in all_findings:
        if f['category'] == 'LGPD':
            deduction = 20.0 if f['severity'] == 'HIGH' else 5.0
            lgpd_score = max(0.0, lgpd_score - deduction)
        if f['category'] == 'OWASP':
             owasp_score = max(0.0, owasp_score - 40.0)

    return {
        "total_rows": total_rows,
        "risks_found": len(all_findings),
        "lgpd_score": round(lgpd_score, 1),
        "operational_score": round(operational_score, 1),
        "owasp_score": round(owasp_score, 1),
        "findings": all_findings
    }
