# 🖥️ GUIA: NOTEBOOK COMO SERVIDOR (15 DIAS)

## ✅ BACKEND PREPARADO!

O backend já está configurado para aceitar conexões externas.

---

## 📋 CHECKLIST DE CONFIGURAÇÃO

### **PASSO 1: Descobrir seu IP Local** ✅ **FAÇA AGORA**

Execute no PowerShell:

```powershell
ipconfig
```

Procure por **"Endereço IPv4"** na sua conexão ativa (Wi-Fi ou Ethernet).

Exemplo: `192.168.1.100`

**Anote esse IP!** 📝

---

### **PASSO 2: Descobrir seu IP Público** ✅ **FAÇA AGORA**

Acesse no navegador:
```
https://meuip.com.br/
```

Ou execute no PowerShell:
```powershell
curl ifconfig.me
```

Exemplo: `200.123.45.67`

**Anote esse IP!** 📝

---

### **PASSO 3: Configurar Port Forwarding no Roteador** ⚠️ **IMPORTANTE**

Você precisa configurar seu roteador para redirecionar a porta 3000 para seu notebook.

#### **Como acessar o roteador:**

1. Abra navegador
2. Digite um desses endereços:
   - `http://192.168.1.1` (mais comum)
   - `http://192.168.0.1`
   - `http://10.0.0.1`

3. **Login** (geralmente):
   - Usuário: `admin`
   - Senha: `admin` ou está na etiqueta do roteador

#### **Configurar Port Forwarding:**

1. Procure por:
   - "Port Forwarding"
   - "Virtual Server"
   - "NAT"
   - "Redirecionamento de Porta"

2. **Adicione uma regra:**
   ```
   Nome: Algor Backend
   Porta Externa: 3000
   Porta Interna: 3000
   IP Interno: 192.168.1.100 (seu IP local)
   Protocolo: TCP
   ```

3. **Salve** e **Reinicie** o roteador (se necessário)

---

### **PASSO 4: Configurar Firewall do Windows** ✅ **FAÇA AGORA**

Execute no PowerShell **como Administrador**:

```powershell
# Permitir porta 3000 no firewall
New-NetFirewallRule -DisplayName "Algor Backend" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

---

### **PASSO 5: Iniciar o Backend** ✅ **FAÇA AGORA**

Execute no PowerShell:

```powershell
wsl --distribution Ubuntu --exec bash -c "cd ~/algorbrasil-backend && npm start"
```

Você deve ver:
```
🚀 Servidor rodando na porta 3000
📍 Ambiente: production
🌐 URL Local: http://localhost:3000
🌍 Acessível em: http://0.0.0.0:3000
```

**Deixe essa janela aberta!** O servidor está rodando.

---

### **PASSO 6: Testar Localmente** ✅ **FAÇA AGORA**

Abra navegador e acesse:

```
http://localhost:3000/health
```

Deve retornar:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "uptime": 123.45
}
```

✅ **Se funcionou:** Backend OK localmente!

---

### **PASSO 7: Testar Externamente** ✅ **FAÇA AGORA**

#### **Opção A: Pelo celular (4G/5G - não Wi-Fi)**

No celular, acesse:
```
http://SEU-IP-PUBLICO:3000/health
```

Exemplo: `http://200.123.45.67:3000/health`

#### **Opção B: Por outro computador**

Peça para alguém acessar de outra rede.

✅ **Se funcionou:** Backend acessível pela internet! 🎉

❌ **Se NÃO funcionou:** Verifique port forwarding e firewall

---

### **PASSO 8: Configurar DynDNS (IP Dinâmico)** ⚠️ **IMPORTANTE**

Seu IP público pode mudar. Use um serviço de DynDNS gratuito:

#### **Opção A: No-IP (Gratuito)** ⭐ **RECOMENDADO**

1. Acesse: https://www.noip.com/
2. Crie conta gratuita
3. Crie um hostname: `algorbrasil.ddns.net` (exemplo)
4. Baixe o cliente No-IP: https://www.noip.com/download
5. Instale e configure com suas credenciais
6. O cliente atualizará seu IP automaticamente

#### **Opção B: DuckDNS (Mais simples)**

1. Acesse: https://www.duckdns.org/
2. Login com Google/GitHub
3. Crie um domínio: `algorbrasil.duckdns.org`
4. Copie o token
5. Configure atualização automática (veja site)

**Agora você terá uma URL fixa:**
```
http://algorbrasil.ddns.net:3000
```

---

### **PASSO 9: Configurar HTTPS (Opcional mas Recomendado)** 🔒

Para HTTPS, você precisa de um certificado SSL.

#### **Opção A: Cloudflare Tunnel (Gratuito)** ⭐ **MAIS FÁCIL**

1. Crie conta: https://www.cloudflare.com/
2. Instale Cloudflare Tunnel
3. Configure tunnel para `localhost:3000`
4. Você terá HTTPS automático!

#### **Opção B: ngrok (Temporário)**

```powershell
# Instalar ngrok
choco install ngrok

# Expor porta 3000
ngrok http 3000
```

Você terá uma URL HTTPS temporária:
```
https://abc123.ngrok.io
```

---

### **PASSO 10: Atualizar Frontend** ✅ **DEPOIS DE TUDO FUNCIONAR**

Edite `js/api-client.js`:

```javascript
// ANTES
this.baseURL = 'http://localhost:3000';

// DEPOIS (com DynDNS)
this.baseURL = 'http://algorbrasil.ddns.net:3000';

// OU (com Cloudflare/ngrok)
this.baseURL = 'https://algorbrasil.cloudflare.com';
```

---

## 🔧 MANUTENÇÃO DIÁRIA

### **Iniciar servidor ao ligar o notebook:**

Crie um script `start-backend.bat`:

```batch
@echo off
wsl --distribution Ubuntu --exec bash -c "cd ~/algorbrasil-backend && npm start"
```

Coloque no **Inicializar** do Windows:
```
C:\Users\SEU-USUARIO\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```

---

## 📊 MONITORAMENTO

### **Ver logs:**
Os logs estão em: `~/algorbrasil-backend/logs/`

### **Ver status:**
```powershell
wsl --distribution Ubuntu --exec bash -c "cd ~/algorbrasil-backend && pm2 status"
```

---

## ⚠️ LIMITAÇÕES (15 DIAS)

### **Problemas que podem ocorrer:**

1. **Queda de energia** → Servidor para
2. **Queda de internet** → Servidor inacessível
3. **IP muda** → DynDNS demora alguns minutos para atualizar
4. **Notebook reinicia** → Precisa iniciar servidor manualmente
5. **Porta 3000 bloqueada pelo ISP** → Use porta 8080 ou 443

---

## 🐛 TROUBLESHOOTING

### **Erro: "Cannot access from outside"**
- ✅ Verifique port forwarding no roteador
- ✅ Verifique firewall do Windows
- ✅ Teste com celular (4G, não Wi-Fi)

### **Erro: "Connection refused"**
- ✅ Verifique se servidor está rodando
- ✅ Verifique se porta está correta

### **Erro: "CORS blocked"**
- ✅ Adicione a URL no `.env`:
  ```
  ALLOWED_ORIGINS=https://hub7-code.github.io,http://seu-ip:3000
  ```

---

## ✅ CHECKLIST FINAL

- [ ] Descobrir IP local
- [ ] Descobrir IP público
- [ ] Configurar port forwarding
- [ ] Configurar firewall Windows
- [ ] Iniciar backend
- [ ] Testar localmente
- [ ] Testar externamente
- [ ] Configurar DynDNS
- [ ] (Opcional) Configurar HTTPS
- [ ] Atualizar frontend com URL
- [ ] Testar formulários
- [ ] Configurar auto-start
- [ ] Celebrar! 🎉

---

## 📞 PRECISA DE AJUDA?

Se tiver problemas:
1. Verifique os logs: `~/algorbrasil-backend/logs/`
2. Teste localmente primeiro
3. Verifique port forwarding
4. Me chame! 😊

---

## 🎯 PRÓXIMOS 15 DIAS

Use esse tempo para:
- ✅ Testar tudo
- ✅ Ver como funciona
- ✅ Pesquisar VPS
- ✅ Comparar preços
- ✅ Escolher melhor opção

**Recomendações para pesquisar:**
- Oracle Cloud Free Tier (gratuito)
- Contabo VPS (R$ 25/mês)
- DigitalOcean (R$ 30/mês)
- Hostinger VPS (R$ 20/mês)

---

**Pronto! Vamos começar? Execute o PASSO 1! 🚀**
