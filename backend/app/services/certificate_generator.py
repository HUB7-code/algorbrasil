from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, mm
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from io import BytesIO
from datetime import datetime
import qrcode
import os

class CertificateGeneratorV2:
    """
    Gerador de Certificados Premium - ALGOR Lab
    Design: Dark Mode + Neon Green + QR Code
    """
    
    @staticmethod
    def generate(student_name: str, course_title: str, date: datetime, certification_id: str) -> BytesIO:
        buffer = BytesIO()
        
        # Configuração da página (Paisagem A4)
        page_width, page_height = landscape(A4)
        
        # Canvas direto para controle total
        c = canvas.Canvas(buffer, pagesize=landscape(A4))
        
        # === BACKGROUND DARK MODE ===
        c.setFillColor(colors.HexColor("#0A1A2F"))  # Deep Navy
        c.rect(0, 0, page_width, page_height, fill=1, stroke=0)
        
        # === BORDER NEON GREEN ===
        c.setStrokeColor(colors.HexColor("#00FF94"))
        c.setLineWidth(3)
        c.rect(20*mm, 20*mm, page_width - 40*mm, page_height - 40*mm, fill=0, stroke=1)
        
        # === INNER BORDER (Subtle) ===
        c.setStrokeColor(colors.HexColor("#1F2937"))
        c.setLineWidth(1)
        c.rect(25*mm, 25*mm, page_width - 50*mm, page_height - 50*mm, fill=0, stroke=1)
        
        # === LOGO ALGOR ===
        # Tentar carregar logo do frontend/public
        logo_paths = [
            os.path.join(os.path.dirname(__file__), "../../../frontend/public/images/algor_association_logo_light.png"),
            os.path.join(os.path.dirname(__file__), "../../../frontend/public/logo-symbol.png"),
            "frontend/public/images/algor_association_logo_light.png",
            "frontend/public/logo-symbol.png"
        ]
        
        logo_loaded = False
        for logo_path in logo_paths:
            if os.path.exists(logo_path):
                try:
                    c.drawImage(logo_path, page_width/2 - 30*mm, page_height - 60*mm, 
                               width=60*mm, height=15*mm, preserveAspectRatio=True, mask='auto')
                    logo_loaded = True
                    break
                except Exception as e:
                    continue
        
        if not logo_loaded:
            # Fallback: Texto estilizado
            c.setFont("Helvetica-Bold", 32)
            c.setFillColor(colors.white)
            c.drawCentredString(page_width/2, page_height - 50*mm, "ALGOR")
            c.setFont("Helvetica", 14)
            c.setFillColor(colors.HexColor("#00FF94"))
            c.drawCentredString(page_width/2, page_height - 55*mm, "BRASIL")
        
        # === TÍTULO DO CERTIFICADO ===
        c.setFont("Helvetica-Bold", 18)
        c.setFillColor(colors.HexColor("#A0AEC0"))  # Gray
        c.drawCentredString(page_width/2, page_height - 75*mm, "CERTIFICADO DE CONCLUSÃO")
        
        # === LINHA DECORATIVA ===
        c.setStrokeColor(colors.HexColor("#00FF94"))
        c.setLineWidth(2)
        c.line(page_width/2 - 80*mm, page_height - 80*mm, 
               page_width/2 + 80*mm, page_height - 80*mm)
        
        # === TEXTO "Conferido a" ===
        c.setFont("Helvetica", 14)
        c.setFillColor(colors.HexColor("#718096"))
        c.drawCentredString(page_width/2, page_height - 95*mm, "Conferido a")
        
        # === NOME DO ALUNO (Destaque) ===
        c.setFont("Helvetica-Bold", 36)
        c.setFillColor(colors.HexColor("#00FF94"))  # Neon Green
        c.drawCentredString(page_width/2, page_height - 110*mm, student_name.upper())
        
        # === LINHA ABAIXO DO NOME ===
        c.setStrokeColor(colors.HexColor("#00FF94"))
        c.setLineWidth(1)
        c.line(page_width/2 - 100*mm, page_height - 115*mm, 
               page_width/2 + 100*mm, page_height - 115*mm)
        
        # === TEXTO DESCRITIVO ===
        c.setFont("Helvetica", 13)
        c.setFillColor(colors.white)
        text_y = page_height - 130*mm
        c.drawCentredString(page_width/2, text_y, "Por ter completado com êxito os requisitos do programa de formação:")
        
        # === NOME DO CURSO (Destaque) ===
        c.setFont("Helvetica-Bold", 16)
        c.setFillColor(colors.HexColor("#00A3FF"))  # Blue
        c.drawCentredString(page_width/2, text_y - 8*mm, course_title)
        
        # === DATA E CÓDIGO ===
        c.setFont("Helvetica", 11)
        c.setFillColor(colors.HexColor("#A0AEC0"))
        c.drawCentredString(page_width/2, text_y - 20*mm, 
                           f"Data de Emissão: {date.strftime('%d de %B de %Y')}")
        
        c.setFont("Helvetica", 9)
        c.setFillColor(colors.HexColor("#718096"))
        c.drawCentredString(page_width/2, text_y - 26*mm, 
                           f"Código de Validação: {certification_id}")
        
        # === QR CODE (Validação Digital) ===
        try:
            from reportlab.graphics import renderPDF
            from reportlab.graphics.shapes import Drawing
            from reportlab.graphics.barcode import qr
            
            # Usar QR Code nativo do reportlab
            qr_code = qr.QrCodeWidget(f"https://www.algorbrasil.com.br/verify/{certification_id}")
            qr_drawing = Drawing(25*mm, 25*mm)
            qr_drawing.add(qr_code)
            
            # Renderizar no canvas
            renderPDF.draw(qr_drawing, c, page_width - 60*mm, 30*mm)
        except Exception as e:
            # Fallback: Texto simples se QR falhar
            c.setFont("Helvetica", 8)
            c.setFillColor(colors.HexColor("#718096"))
            c.drawString(page_width - 60*mm, 35*mm, "QR Code")
            c.drawString(page_width - 60*mm, 32*mm, "Validação")
        
        # === ASSINATURA ===
        signature_x = page_width/2
        signature_y = 50*mm
        
        c.setStrokeColor(colors.HexColor("#00FF94"))
        c.setLineWidth(1)
        c.line(signature_x - 40*mm, signature_y, signature_x + 40*mm, signature_y)
        
        c.setFont("Helvetica-Bold", 12)
        c.setFillColor(colors.white)
        c.drawCentredString(signature_x, signature_y - 6*mm, "ALGOR BRASIL")
        
        c.setFont("Helvetica", 10)
        c.setFillColor(colors.HexColor("#A0AEC0"))
        c.drawCentredString(signature_x, signature_y - 11*mm, "Associação de Governança de IA")
        
        # === NOTA DE VERIFICAÇÃO (Rodapé) ===
        c.setFont("Helvetica", 7)
        c.setFillColor(colors.HexColor("#718096"))
        c.drawCentredString(page_width/2, 25*mm, 
                           "Este certificado pode ser verificado digitalmente através do QR Code ou em:")
        c.drawCentredString(page_width/2, 22*mm, 
                           f"https://www.algorbrasil.com.br/verify/{certification_id}")
        
        # === WATERMARK (Opcional) ===
        c.saveState()
        c.setFont("Helvetica-Bold", 60)
        c.setFillColor(colors.HexColor("#1F2937"))
        c.setFillAlpha(0.05)
        c.translate(page_width/2, page_height/2)
        c.rotate(45)
        c.drawCentredString(0, 0, "ALGOR LAB")
        c.restoreState()
        
        # Finalizar PDF
        c.showPage()
        c.save()
        
        buffer.seek(0)
        return buffer


# Manter compatibilidade com código antigo
class CertificateGenerator:
    @staticmethod
    def generate(student_name: str, course_title: str, date: datetime, certification_id: str) -> BytesIO:
        """Wrapper para usar a versão V2 automaticamente"""
        return CertificateGeneratorV2.generate(student_name, course_title, date, certification_id)
