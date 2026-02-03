
import os
import smtplib
import socket
from email.mime.text import MIMEText
from dotenv import load_dotenv

def check_smtp():
    # Carregar .env explicitamente para garantir
    load_dotenv()
    
    print("🔍 DIAGNÓSTICO DE SMTP (ALGOR BRASIL)")
    print("---------------------------------------")
    
    # 1. Verificar Variáveis de Ambiente
    smtp_server = os.getenv("SMTP_SERVER", "smtp-relay.brevo.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASSWORD")
    
    print(f"📡 SERVER: {smtp_server}:{smtp_port}")
    print(f"👤 USER: {smtp_user if smtp_user else '❌ NÃO DEFINIDO'}")
    print(f"🔑 PASS: {'********' if smtp_pass else '❌ NÃO DEFINIDO'}")
    
    if not smtp_user or not smtp_pass:
        print("\n❌ ERRO FATAL: Credenciais SMTP não encontradas no .env")
        return

    # 2. Verificar Resolução de DNS
    print("\n🌐 Testando DNS...")
    try:
        ip = socket.gethostbyname(smtp_server)
        print(f"✅ DNS Resolvido: {smtp_server} -> {ip}")
    except Exception as e:
        print(f"❌ Falha no DNS: {e}")
        return

    # 3. Testar Conexão TCP (Firewall)
    print("\n🔌 Testando Conexão TCP (Porta 587)...")
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        result = sock.connect_ex((smtp_server, smtp_port))
        if result == 0:
            print("✅ Porta 587 acessível (TCP Handshake OK)")
        else:
            print(f"❌ Porta 587 fechada ou bloqueada (Errno: {result})")
            print("   DICA: Verifique Firewall da VPS (UFW) ou Regras de Saída da Cloud (AWS/DigitalOcean bloqueiam SMTP por padrão).")
            return
        sock.close()
    except Exception as e:
        print(f"❌ Erro ao conectar: {e}")
        return

    # 4. Testar Login SMTP
    print("\n🔐 Testando Autenticação SMTP...")
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.set_debuglevel(1) # Verbose output
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        print("✅ Login SMTP Realizado com Sucesso!")
        
        # 5. Enviar Email de Teste
        print("\n📧 Enviando E-mail de Teste...")
        msg = MIMEText("Este é um e-mail de teste de diagnóstico do servidor VPS.")
        msg['Subject'] = "Algor VPS SMTP Test"
        msg['From'] = f"Algor Admin <{smtp_user}>"
        msg['To'] = smtp_user # Envia para si mesmo
        
        server.send_message(msg)
        print("✅ E-mail enviado com sucesso!")
        server.quit()
        
    except smtplib.SMTPAuthenticationError:
        print("❌ Erro de Autenticação: Usuário ou Senha incorretos.")
    except Exception as e:
        print(f"❌ Erro durante sessão SMTP: {e}")

if __name__ == "__main__":
    check_smtp()
