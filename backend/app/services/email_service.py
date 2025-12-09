import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from backend.app.core.config import settings

def send_smtp_email(to_email: str, subject: str, html_content: str):
    """
    Envia email via SMTP (Brevo/Sendinblue, etc)
    """
    if not settings.SMTP_PASSWORD or not settings.SMTP_USER:
        print(f"⚠️ SMTP Settings missing. Email to {to_email} skipped.")
        return

    msg = MIMEMultipart()
    msg['From'] = f"{settings.SMTP_FROM_NAME} <{settings.SMTP_FROM_EMAIL}>"
    msg['To'] = to_email
    msg['Subject'] = subject

    msg.attach(MIMEText(html_content, 'html'))

    try:
        print(f"🔄 Connecting to {settings.SMTP_SERVER}:{settings.SMTP_PORT}...")
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
            print(f"✅ Email sent successfully to {to_email}")
    except Exception as e:
        print(f"❌ Failed to send email to {to_email}: {e}")

def send_welcome_email(name: str, email: str, is_member: bool = False):
    """
    Email de Boas-vindas para novos cadastros.
    """
    role_text = "Membro Associado" if is_member else "assinante"
    
    subject = f"Bem-vindo à Algor Brasil - {name}"
    
    body = f"""
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #000; padding: 20px; text-align: center;">
            <h1 style="color: #B87333; margin: 0;">ALGOR BRASIL</h1>
        </div>
        <div style="padding: 30px; border: 1px solid #ddd;">
            <h2>Olá, {name}!</h2>
            <p>Seja bem-vindo à elite da Governança de IA no Brasil.</p>
            <p>Recebemos seu cadastro como <b>{role_text}</b>.</p>
            
            <p>Você pode acessar seu console de membro agora mesmo:</p>
            <p style="text-align: center; margin: 30px 0;">
                <a href="https://algorbrasil.com.br/login.html" 
                   style="background-color: #B87333; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px;">
                   ACESSAR MEU CONSOLE
                </a>
            </p>
            
            <p>Se tiver dúvidas, responda a este email.</p>
            <br>
            <p>Atenciosamente,<br><b>Equipe Algor Brasil</b></p>
        </div>
        <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
            &copy; 2025 Algor Brasil. Todos os direitos reservados.
        </div>
    </div>
    """
    
    send_smtp_email(email, subject, body)

def send_admin_alert(subject: str, data: dict):
    """
    Avisa o Admin (Você) sobre novos leads.
    """
    # Formatar dados em tabela HTML
    rows = ""
    for k, v in data.items():
        rows += f"<tr><td style='padding:8px; border:1px solid #ddd;'><b>{k}</b></td><td style='padding:8px; border:1px solid #ddd;'>{v}</td></tr>"

    body = f"""
    <h2>🔔 Novo Alerta do Site</h2>
    <h3>{subject}</h3>
    <table style="width:100%; border-collapse: collapse;">
        {rows}
    </table>
    <p>Acesse o painel para ver mais detalhes.</p>
    """
    
    # Envia para o email do admin (configurado como SMTP_USER ou outro fixo)
    admin_email = settings.SMTP_USER 
    send_smtp_email(admin_email, f"[ALGOR ADMIN] {subject}", body)
