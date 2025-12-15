from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.units import mm
import io
import datetime

class ReportGenerator:
    def __init__(self, user_name: str, assessment_data: dict = None):
        self.user_name = user_name
        self.assessment_data = assessment_data or {}
        self.buffer = io.BytesIO()
        self.p = canvas.Canvas(self.buffer, pagesize=A4)
        self.width, self.height = A4

    def _draw_header(self):
        # Background Header
        self.p.setFillColorRGB(0.04, 0.1, 0.18) # Deep Navy (#0A1A2F)
        self.p.rect(0, self.height - 40*mm, self.width, 40*mm, fill=1, stroke=0)
        
        # Logo Text (Simulated)
        self.p.setFillColor(colors.white)
        self.p.setFont("Helvetica-Bold", 24)
        self.p.drawString(20*mm, self.height - 25*mm, "ALGOR BRASIL")
        
        self.p.setFont("Helvetica", 10)
        self.p.setFillColorRGB(0.0, 1.0, 0.58) # Brand Green (#00FF94)
        self.p.drawString(20*mm, self.height - 32*mm, "VIABILITY REPORT // GROWTH AI COMPLIANT")

    def _draw_footer(self):
        self.p.setFillColor(colors.gray)
        self.p.setFont("Helvetica", 8)
        self.p.drawString(20*mm, 15*mm, f"Generated for: {self.user_name} | {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}")
        self.p.drawRightString(self.width - 20*mm, 15*mm, "Confidential & Proprietary")

    def _draw_content(self):
        y_position = self.height - 60*mm
        
        # Title
        self.p.setFillColor(colors.black)
        self.p.setFont("Helvetica-Bold", 18)
        self.p.drawString(20*mm, y_position, "Relatório de Viabilidade e Risco")
        y_position -= 15*mm

        # Introduction
        self.p.setFont("Helvetica", 11)
        self.p.setFillColor(colors.darkgray)
        text_lines = [
            "Este documento certifica a análise preliminar da infraestrutura de dados para",
            "campanhas de Growth Hacking de alta performance.",
            "",
            "A metodologia 'Fortress Growth' avaliou os seguintes pilares:"
        ]
        
        for line in text_lines:
            self.p.drawString(20*mm, y_position, line)
            y_position -= 6*mm
        
        y_position -= 10*mm

        # Score Card Box
        self.p.setStrokeColorRGB(0.0, 0.64, 1.0) # Brand Blue
        self.p.setFillColorRGB(0.95, 0.98, 1.0)
        self.p.rect(20*mm, y_position - 30*mm, self.width - 40*mm, 30*mm, fill=1)
        
        self.p.setFillColor(colors.black)
        self.p.setFont("Helvetica-Bold", 14)
        self.p.drawString(30*mm, y_position - 10*mm, "RISK SCORE (ISO 42001)")
        
        score = self.assessment_data.get('total_score', 85)
        
        self.p.setFont("Helvetica-Bold", 28)
        if score >= 70:
            self.p.setFillColorRGB(0.0, 0.6, 0.0) # Green
            verdict = "SAFE TO SCALE"
        elif score >= 40:
            self.p.setFillColorRGB(0.8, 0.4, 0.0) # Orange
            verdict = "CAUTION"
        else:
            self.p.setFillColorRGB(0.8, 0.0, 0.0) # Red
            verdict = "HIGH RISK"
            
        self.p.drawString(30*mm, y_position - 22*mm, f"{score}/100 - {verdict}")
        
        y_position -= 45*mm

        # Recommendations
        self.p.setFillColor(colors.black)
        self.p.setFont("Helvetica-Bold", 12)
        self.p.drawString(20*mm, y_position, "Recomendações Técnicas:")
        y_position -= 8*mm
        
        recommendations = [
            "1. Implementar Data Clean Room para isolamento de PII.",
            "2. Atualizar política de Opt-out para SLA de 24h.",
            "3. Estabelecer auditoria algorítmica mensal."
        ]
        
        self.p.setFont("Helvetica", 10)
        for rec in recommendations:
            self.p.drawString(25*mm, y_position, rec)
            y_position -= 6*mm
            
        # Signature Block
        y_position = 50*mm
        self.p.setStrokeColor(colors.black)
        self.p.line(120*mm, y_position, 180*mm, y_position)
        self.p.setFont("Helvetica-Oblique", 9)
        self.p.drawString(120*mm, y_position - 5*mm, "Assinado Digitalmente: Algor System")


    def generate(self) -> bytes:
        self._draw_header()
        self._draw_footer()
        self._draw_content()
        self.p.showPage()
        self.p.save()
        self.buffer.seek(0)
        return self.buffer.getvalue()
