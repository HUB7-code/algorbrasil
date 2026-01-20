
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
            Nossa equipe de engenharia de soluções já está analisando o perfil da sua empresa.
            Em breve, um especialista entrará em contato para agendar a reunião de levantamento.
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
