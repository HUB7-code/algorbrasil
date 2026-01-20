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

def send_verification_email(name: str, email: str, token: str):
    """
    Envia e-mail com link de ativacao (Double Opt-in) - Design Premium v2 com LOGO REAL.
    """
    verification_link = f"{settings.FRONTEND_URL}/verify-email?token={token}"

    # Debug para confirmar URL em produção
    print(f"🔗 [V16.4.1-FIX] Configuração de Frontend URL: {settings.FRONTEND_URL}")
    # DEV: Imprimir URL completa para facilitar ativação sem email real
    print(f"✅ [DEV ONLY] LINK DE ATIVAÇÃO: {verification_link}")
    print(f"🔒 [DEBUG] Token parcial: {token[:10]}...")
    
    subject = f"Confirme seu cadastro - Algor Brasil"

    # Caminho absoluto para a logo (ajustar conforme ambiente)
    # Tenta resolver o caminho relativo à raiz do projeto
    # Na VPS, o cwd pode variar dependendo de como o uvicorn é iniciado
    current_dir = os.getcwd()
    
    # Se estiver rodando de backend/, subir um nível
    if os.path.basename(current_dir) == "backend":
        base_dir = os.path.abspath(os.path.join(current_dir, ".."))
    else:
        base_dir = current_dir
        
    logo_path = os.path.join(base_dir, "frontend", "public", "logo-algor.webp")
    
    body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            .btn-hover:hover {{ opacity: 0.9; transform: scale(1.02); }}
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e1e4e8;">
            
            <!-- HEADER PREMIUM -->
            <div style="background-color: #0A0E1A; padding: 40px 20px; text-align: center; border-bottom: 1px solid #00FF94;">
                <div style="display: inline-block;">
                    <!-- LOGO REAL VIA CID -->
                    <img src="cid:logo_algor" alt="ALGOR BRASIL" style="width: 120px; height: auto; display: block; margin: 0 auto;">
                </div>
                <div style="color: #6c757d; font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 3px; margin-top: 12px; text-transform: uppercase;">
                    Trust Hub v5.1
                </div>
            </div>

            <!-- CORPO -->
            <div style="padding: 40px 30px; text-align: center;">
                <h2 style="color: #1a202c; font-size: 22px; margin-top: 0; margin-bottom: 20px;">Olá, {name}!</h2>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    Para garantir a segurança da sua conta e acessar a 
                    <strong>Plataforma de Governança de IA</strong>, precisamos validar seu endereço de e-mail.
                </p>
                
                <!-- BOTAO GRADIENT -->
                <div style="margin: 40px 0;">
                    <a href="{verification_link}" class="btn-hover"
                       style="background: linear-gradient(90deg, #00FF94 0%, #00CC76 100%); 
                              color: #0A0E1A; 
                              padding: 16px 40px; 
                              text-decoration: none; 
                              font-weight: 800; 
                              font-size: 14px;
                              border-radius: 8px; 
                              text-transform: uppercase; 
                              letter-spacing: 1px;
                              display: inline-block;
                              box-shadow: 0 10px 20px rgba(0, 255, 148, 0.2);">
                       Confirmar Acesso
                    </a>
                </div>
                
                <p style="font-size: 12px; color: #a0aec0; margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px;">
                    Se o botão não funcionar, copie este link:<br>
                    <a href="{verification_link}" style="color: #00A3FF; text-decoration: none; word-break: break-all;">
                        {verification_link}
                    </a>
                </p>
            </div>

            <!-- FOOTER -->
            <div style="background-color: #050810; padding: 20px; text-align: center; color: #4a5568; font-size: 11px;">
                <p style="margin: 5px 0;">&copy; 2025 Algor Association. Secure Enclave.</p>
                <p style="margin: 5px 0;">Enviado automaticamente pelo sistema de segurança.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    send_smtp_email(email, subject, body, logo_path)

def send_password_reset_email(name: str, email: str, token: str):
    """
    Envia e-mail com link de redefinicao de senha - Design Premium v2.
    """
    reset_link = f"{settings.FRONTEND_URL}/reset-password?token={token}"
    
    subject = f"Redefinição de Senha - Algor Brasil"

    # Caminho absoluto para a logo
    # Tenta resolver o caminho relativo à raiz do projeto
    current_dir = os.getcwd()
    if os.path.basename(current_dir) == "backend":
        base_dir = os.path.abspath(os.path.join(current_dir, ".."))
    else:
        base_dir = current_dir

    logo_path = os.path.join(base_dir, "frontend", "public", "logo-algor.webp")
    
    body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            .btn-hover:hover {{ opacity: 0.9; transform: scale(1.02); }}
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e1e4e8;">
            
            <!-- HEADER PREMIUM -->
            <div style="background-color: #0A0E1A; padding: 40px 20px; text-align: center; border-bottom: 1px solid #00FF94;">
                <div style="display: inline-block;">
                    <img src="cid:logo_algor" alt="ALGOR BRASIL" style="width: 120px; height: auto; display: block; margin: 0 auto;">
                </div>
                <div style="color: #6c757d; font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 3px; margin-top: 12px; text-transform: uppercase;">
                    Trust Hub v5.1
                </div>
            </div>

            <!-- CORPO -->
            <div style="padding: 40px 30px; text-align: center;">
                <h2 style="color: #1a202c; font-size: 22px; margin-top: 0; margin-bottom: 20px;">Olá, {name}!</h2>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    Recebemos uma solicitação para redefinir a senha da sua conta Algor.
                    Se não foi você, ignore este e-mail.
                </p>
                
                <!-- BOTAO GRADIENT RED -->
                <div style="margin: 40px 0;">
                    <a href="{reset_link}" class="btn-hover"
                       style="background: linear-gradient(90deg, #FF5F5F 0%, #E03E3E 100%); 
                              color: #FFFFFF; 
                              padding: 16px 40px; 
                              text-decoration: none; 
                              font-weight: 800; 
                              font-size: 14px;
                              border-radius: 8px; 
                              text-transform: uppercase; 
                              letter-spacing: 1px;
                              display: inline-block;
                              box-shadow: 0 10px 20px rgba(255, 95, 95, 0.2);">
                       Redefinir Senha
                    </a>
                </div>
                
                <p style="font-size: 12px; color: #a0aec0; margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px;">
                    Ou copie o link abaixo:<br>
                    <a href="{reset_link}" style="color: #FF5F5F; text-decoration: none; word-break: break-all;">
                        {reset_link}
                    </a>
                </p>
            </div>

            <!-- FOOTER -->
            <div style="background-color: #050810; padding: 20px; text-align: center; color: #4a5568; font-size: 11px;">
                <p style="margin: 5px 0;">&copy; 2025 Algor Association. Secure Enclave.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    send_smtp_email(email, subject, body, logo_path)

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

def send_2fa_email(email: str, code: str):
    """
    Envia código OTP para 2FA via SMTP.
    """
    subject = f"Código de Verificação: {code}"
    body = f"""
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; padding: 30px; border: 1px solid #eee; max-width: 500px; border-radius: 8px;">
        <h2 style="color: #0A1A2F; margin-top: 0;">Verificação de Segurança</h2>
        <p>Use o código abaixo para completar seu login no sistema ALGOR:</p>
        <div style="background: #F0F4F8; padding: 20px; text-align: center; border-radius: 4px; margin: 20px 0;">
            <span style="color: #00A3FF; letter-spacing: 8px; font-size: 36px; font-weight: bold; font-family: monospace;">{code}</span>
        </div>
        <p style="font-size: 12px; color: #666;">Este código expira em 5 minutos.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">Algor Brasil - Proteção de Dados e Governança de IA</p>
    </div>
    """
    send_smtp_email(email, subject, body)

def send_new_lead_confirmation(name: str, email: str, lead_type: str = "Diagnostic"):
    """
    Envia email de confirmação para o lead que acabou de se cadastrar.
    """
    import os
    from backend.app.core.config import settings

    # Configurar caminho da logo
    current_dir = os.getcwd()
    if os.path.basename(current_dir) == "backend":
        base_dir = os.path.abspath(os.path.join(current_dir, ".."))
    else:
        base_dir = current_dir
    logo_path = os.path.join(base_dir, "frontend", "public", "logo-algor.webp")

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
