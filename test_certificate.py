"""
Script de teste para geração de certificado premium
"""
import sys
sys.path.insert(0, 'backend')

from backend.app.services.certificate_generator import CertificateGenerator
from datetime import datetime

# Gerar certificado de teste
pdf_buffer = CertificateGenerator.generate(
    student_name="Edson Silva Santos",
    course_title="Formação Lead Implementer ISO/IEC 42001 - Etapa 02",
    date=datetime.now(),
    certification_id="CRT-ISO42001-ETAPA02-001"
)

# Salvar arquivo
with open("certificate_test_premium.pdf", "wb") as f:
    f.write(pdf_buffer.read())

print("✅ Certificado gerado com sucesso!")
print("📄 Arquivo: certificate_test_premium.pdf")
print("🎨 Design: Dark Mode + Neon Green + QR Code")
