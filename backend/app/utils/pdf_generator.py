from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.units import cm
from io import BytesIO
import datetime

def generate_assessment_report_pdf(assessment, user_name: str) -> BytesIO:
    """
    Gera um relatório PDF para uma auditoria ISO 42001.
    Retorna um buffer de bytes (BytesIO).
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2*cm, leftMargin=2*cm,
        topMargin=2*cm, bottomMargin=2*cm
    )

    elements = []
    styles = getSampleStyleSheet()
    
    # Custom Styles
    styles.add(ParagraphStyle(name='TitleCustom', parent=styles['Heading1'], fontSize=24, spaceAfter=20, textColor=colors.HexColor('#062E6F')))
    styles.add(ParagraphStyle(name='SubtitleCustom', parent=styles['Heading2'], fontSize=14, spaceAfter=10, textColor=colors.HexColor('#004A77')))
    styles.add(ParagraphStyle(name='NormalCustom', parent=styles['Normal'], fontSize=10, leading=14, spaceAfter=8))
    
    # 1. Header
    report_date = datetime.datetime.now().strftime("%d/%m/%Y")
    
    # Logo Handling
    import os
    # Using the same logo as frontend
    logo_path = os.path.join(os.path.dirname(__file__), "..", "assets", "logo-algor.webp") 
    
    if os.path.exists(logo_path):
        # Draw Logo - MUCH Larger
        # Using preserveAspectRation logic implicitly by ReportLab if kind='proportional'
        im = Image(logo_path, width=8*cm, height=8*cm, kind='proportional')
        im.hAlign = 'LEFT'
        elements.append(im)
        elements.append(Spacer(1, 1*cm))
    
    elements.append(Paragraph("Relatório de Conformidade ISO/IEC 42001", styles['TitleCustom']))
    elements.append(Paragraph(f"<b>Projeto/Auditoria:</b> {assessment.title}", styles['NormalCustom']))
    elements.append(Paragraph(f"<b>Responsável:</b> {user_name}", styles['NormalCustom']))
    elements.append(Paragraph(f"<b>Data de Emissão:</b> {report_date}", styles['NormalCustom']))
    elements.append(Spacer(1, 1*cm))

    # 2. Executive Summary Box
    score = assessment.score_total
    score_color = colors.green if score >= 70 else colors.orange if score >= 30 else colors.red
    status_text = 'OTIMIZADO' if score >= 70 else 'DEFINIDO' if score >= 30 else 'INICIAL / RISCO'

    summary_data = [
        ['SCORE DE MATURIDADE', 'STATUS DO SISTEMA'],
        [f"{score}/100", status_text]
    ]
    
    # Increased rowHeights to fit the 30pt text
    t_summary = Table(summary_data, colWidths=[8*cm, 8*cm], rowHeights=[1*cm, 2.5*cm])
    t_summary.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F3F4F6')), # Header Gray
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.gray),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 1), (0, 1), 28), # Slightly reduced for safety
        ('TEXTCOLOR', (0, 1), (0, 1), score_color),
        ('FONTSIZE', (1, 1), (1, 1), 14),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), # Vertical Center
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#E5E7EB')),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    elements.append(t_summary)
    elements.append(Spacer(1, 0.5*cm))
    
    elements.append(Paragraph("Resumo Executivo:", styles['SubtitleCustom']))
    elements.append(Paragraph(assessment.report_summary, styles['NormalCustom']))
    elements.append(Spacer(1, 1*cm))

    # 3. Detailed Answers
    elements.append(Paragraph("Detalhamento dos Controles", styles['SubtitleCustom']))
    
    # Convert answers payload to table data
    answers_data = [['Controle / Requisito', 'Resposta']]
    if assessment.answers_payload:
        for key, val in assessment.answers_payload.items():
            # Format key nicely
            friendly_key = key.replace('_', ' ').capitalize()
            answers_data.append([friendly_key, str(val)])
    else:
        answers_data.append(["Nenhuma resposta registrada", "-"])

    t_answers = Table(answers_data, colWidths=[12*cm, 4*cm])
    t_answers.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#062E6F')), # Header Blue
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#F9FAFB')), # Zebra Light
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E5E7EB')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F8FAFC')]),
    ]))
    elements.append(t_answers)
    
    elements.append(Spacer(1, 1*cm))
    
    # Footer Disclaimer
    footer_text = """
    Este relatório foi gerado automaticamente pela plataforma Algor Brasil (ISO 42001 AI Management System). 
    A validação final deste diagnóstico requer a revisão de um auditor humano credenciado.
    """
    elements.append(Paragraph(footer_text, ParagraphStyle('Footer', parent=styles['Normal'], fontSize=8, textColor=colors.gray, alignment=1)))

    # Build PDF
    doc.build(elements)
    buffer.seek(0)
    return buffer
