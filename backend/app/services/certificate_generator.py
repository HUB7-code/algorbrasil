from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from io import BytesIO
from datetime import datetime

class CertificateGenerator:
    @staticmethod
    def generate(student_name: str, course_title: str, date: datetime, certification_id: str) -> BytesIO:
        buffer = BytesIO()
        # Paisagem
        doc = SimpleDocTemplate(buffer, pagesize=landscape(A4), rightMargin=50, leftMargin=50, topMargin=50, bottomMargin=50)
        
        elements = []
        styles = getSampleStyleSheet()
        
        # Estilos Customizados
        title_style = ParagraphStyle(
            'Title',
            parent=styles['Heading1'],
            fontSize=36,
            textColor=colors.HexColor("#0A1A2F"),
            alignment=1, # Center
            spaceAfter=30
        )
        
        subtitle_style = ParagraphStyle(
            'Subtitle',
            parent=styles['Normal'],
            fontSize=18,
            textColor=colors.HexColor("#666666"),
            alignment=1,
            spaceAfter=20
        )

        name_style = ParagraphStyle(
            'Name',
            parent=styles['Heading2'],
            fontSize=42,
            textColor=colors.HexColor("#00A3FF"), # Algor Blue
            alignment=1,
            spaceAfter=20
        )

        text_style = ParagraphStyle(
            'Text',
            parent=styles['Normal'],
            fontSize=14,
            alignment=1,
            leading=20
        )

        # Conteúdo
        elements.append(Spacer(1, 0.5*inch))
        elements.append(Paragraph("CERTIFICADO DE NOBREZA E EXCELÊNCIA TÉCNICA", subtitle_style))
        elements.append(Spacer(1, 0.5*inch))
        
        elements.append(Paragraph("Conferido a", subtitle_style))
        elements.append(Paragraph(student_name.upper(), name_style))
        
        elements.append(Spacer(1, 0.5*inch))
        text = f"Por ter completado com êxito os requisitos do programa de formação:<br/><b>{course_title}</b>"
        elements.append(Paragraph(text, text_style))
        
        elements.append(Spacer(1, 0.5*inch))
        elements.append(Paragraph(f"Data de Emissão: {date.strftime('%d/%m/%Y')}", text_style))
        elements.append(Paragraph(f"Código de Validação: {certification_id}", ParagraphStyle('Code', parent=text_style, fontSize=10, textColor=colors.gray)))

        # Assinatura e Rodapé Institucional
        elements.append(Spacer(1, 0.8*inch))
        
        signature_style = ParagraphStyle(
            'Signature',
            parent=styles['Normal'],
            fontSize=12,
            alignment=1,
            textColor=colors.HexColor("#333333")
        )
        
        elements.append(Paragraph("_______________________________", signature_style))
        elements.append(Paragraph("ALGOR BRASIL", ParagraphStyle('SignatureName', parent=signature_style, fontSize=14, fontName='Helvetica-Bold')))
        elements.append(Paragraph("Associação de Governança de IA", signature_style))
        
        # Nota de verificação digital
        elements.append(Spacer(1, 0.3*inch))
        verification_note = ParagraphStyle('Note', parent=text_style, fontSize=8, textColor=colors.gray)
        elements.append(Paragraph(
            f"Este certificado pode ser verificado em: https://www.algorbrasil.com.br/verify/{certification_id}",
            verification_note
        ))

        doc.build(elements)
        buffer.seek(0)
        return buffer
