import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
import os
from backend.app.core.config import settings

def send_smtp_email(to_email: str, subject: str, html_content: str, logo_path: str = None):
    """
    Envia email via SMTP com suporte a imagem embutida (CID).
    """
    if not settings.SMTP_PASSWORD or not settings.SMTP_USER:
        print(f"⚠️ SMTP Settings missing. Email to {to_email} skipped.")
        return

    msg = MIMEMultipart('related') # 'related' é necessário para imagens inline
    msg['From'] = f"{settings.SMTP_FROM_NAME} <{settings.SMTP_FROM_EMAIL}>"
    msg['To'] = to_email
    msg['Subject'] = subject

    msg_alternative = MIMEMultipart('alternative')
    msg.attach(msg_alternative)

    msg_alternative.attach(MIMEText(html_content, 'html'))

    # Anexar Logo Inline se fornecido
    if logo_path:
        print(f"📧 DEBUG: Tentando anexar logo de: {logo_path}")
        if os.path.exists(logo_path):
            try:
                with open(logo_path, 'rb') as f:
                    img_data = f.read()
                
                # Determinar subtipo (webp, png, jpg)
                ext = logo_path.split('.')[-1]
                if ext == 'webp':
                    img = MIMEImage(img_data, _subtype='webp')
                else:
                    img = MIMEImage(img_data)
                
                img.add_header('Content-ID', '<logo_algor>')
                img.add_header('Content-Disposition', 'inline', filename=os.path.basename(logo_path))
                msg.attach(img)
                print(f"📎 Logo anexada com sucesso!")
            except Exception as e:
                print(f"⚠️ Falha ao ler/anexar logo: {e}")
        else:
            print(f"⚠️ Logo NÃO encontrada em: {logo_path} (CWD: {os.getcwd()})")

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



def send_new_lead_confirmation(name: str, email: str, lead_type: str = "Diagnostic"):
    """
    Envia email de confirmação para o lead que acabou de se cadastrar.
    """
    import os
    from backend.app.core.config import settings

    # Localizar a logo atual do site (logo-symbol.png = escudo+globo azul/verde)
    current_dir = os.getcwd()
    if os.path.basename(current_dir) == "backend":
        base_dir = os.path.abspath(os.path.join(current_dir, ".."))
    else:
        base_dir = current_dir

    logo_candidates = [
        os.path.join(base_dir, "frontend", "public", "logo-email.png"),   # logo horizontal oficial para emails
        os.path.join(base_dir, "frontend", "public", "logo-symbol.png"),  # fallback
        os.path.join(base_dir, "frontend", "public", "logo-algor.png"),   # fallback final
    ]
    logo_path = next((p for p in logo_candidates if os.path.exists(p)), None)

    subject = f"Recebemos sua solicitação - ALGOR Brasil"
    
    # Customizar mensagem baseada no tipo de lead
    if lead_type == "Diagnostic":
        title = "Solicitação de Diagnóstico Recebida"
        message = """
            Recebemos sua solicitação para um <b>Diagnóstico Técnico de IA</b>.
            <br><br>
            Recebemos seus dados iniciais e nossa equipe de engenharia de soluções já foi notificada.
            Em breve, um especialista entrará em contato para iniciar o levantamento detalhado dos seus requisitos.
        """
    elif lead_type == "Specialist":
        title = "Contato com Especialista Solicitado"
        message = """
            Recebemos seu pedido de contato com nossos especialistas.
            <br><br>
            Entendemos a urgência e a importância de uma governança robusta.
            Nossa equipe executiva entrará em contato priorizado em até 24 horas úteis.
        """
    else:
        title = "Solicitação Recebida"
        message = "Recebemos seu contato e retornaremos em breve."

    body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="margin: 0; padding: 0; background-color: #0A0E1A; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #131825; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.5); border: 1px solid #1C2333;">
            
            <!-- HEADER -->
            <div style="background-color: #0F1219; padding: 40px 20px; text-align: center; border-bottom: 1px solid #00FF94;">
                <div style="display: inline-block;">
                     <img src="cid:logo_algor" alt="ALGOR BRASIL" style="width: 120px; height: auto; display: block; margin: 0 auto;">
                </div>
                <div style="color: #00FF94; font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 3px; margin-top: 15px; text-transform: uppercase;">
                    Confirmação de Recebimento
                </div>
            </div>

            <!-- CORPO -->
            <div style="padding: 40px 30px; text-align: center;">
                <h2 style="color: #ffffff; font-size: 24px; margin-top: 0; margin-bottom: 20px;">Olá, {name}!</h2>
                
                <div style="background-color: #1C2333; border: 1px solid #2D3748; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
                    <h3 style="color: #00FF94; margin-top: 0; font-size: 18px;">{title}</h3>
                    <p style="color: #A0AEC0; font-size: 15px; line-height: 1.6; margin-bottom: 0;">
                        {message}
                    </p>
                </div>
                
                <p style="color: #718096; font-size: 14px; margin-bottom: 20px;">
                    Enquanto isso, você pode explorar nossos recursos públicos:
                </p>

                <div style="margin: 30px 0;">
                    <a href="{settings.FRONTEND_URL}/solutions/enterprise" 
                       style="background: transparent; 
                              border: 1px solid #00FF94;
                              color: #00FF94; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              font-weight: 600; 
                              font-size: 13px;
                              border-radius: 6px; 
                              text-transform: uppercase; 
                              letter-spacing: 1px;
                              display: inline-block;">
                       Ver Soluções Enterprise
                    </a>
                </div>
            </div>

            <!-- FOOTER -->
            <div style="background-color: #050810; padding: 25px; text-align: center; color: #4a5568; font-size: 11px; border-top: 1px solid #1C2333;">
                <p style="margin: 5px 0;">&copy; 2026 Algor Association. Secure Enclave.</p>
                <p style="margin: 5px 0;">Não responda a este email automático.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    send_smtp_email(email, subject, body, logo_path)
