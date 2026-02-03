# 🌐 Guia de Configuração: Login com Google (OAuth)

Para habilitar o botão "Entrar com Google", você precisa registrar o ALGOR Brasil como um aplicativo no Google Cloud. É gratuito e rápido.

## 1. Criar Projeto no Google Cloud
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Faça login com sua conta Google.
3. No topo, clique no seletor de projetos e depois em **"New Project"** (Novo Projeto).
4. Nome do Projeto: `Algor Brasil`.
5. Clique em **Creates** (Criar).

## 2. Configurar a Tela de Consentimento (OAuth Consent Screen)
1. No menu lateral esquerdo, vá em **APIs & Services** > **OAuth consent screen**.
2. Escolha **External** (Externo) e clique em **Create**.
3. Preencha as informações obrigatórias:
   - **App name:** `Algor Brasil`
   - **User support email:** Selecione seu e-mail.
   - **Developer contact information:** Coloque seu e-mail novamente.
4. Clique em **Save and Continue** nas próximas telas (Scopes e Test Users) até finalizar.
5. **IMPORTANTE:** No final, na dashboard "OAuth Consent Screen", clique no botão **"PUBLISH APP"** (Publicar Aplicativo) para que funcione para qualquer pessoa, não só para testes.

## 3. Criar as Credenciais (Client ID e Secret)
1. No menu lateral, clique em **Credentials** (Credenciais).
2. Clique em **+ CREATE CREDENTIALS** (no topo) > **OAuth client ID**.
3. **Application type:** Escolha **Web application**.
4. **Name:** `Algor Web` (ou deixe o padrão).
5. **Authorized JavaScript origins** (Sites que podem chamar o login):
   - Adicione: `https://algorbrasil.com.br`
   - Adicione: `http://localhost:3000` (para testar no seu PC)
6. **Authorized redirect URIs** (Para onde o Google devolve o usuário):
   - Adicione: `https://algorbrasil.com.br/api/v1/auth/google/callback`
   - Adicione: `http://localhost:3000/api/v1/auth/google/callback`
7. Clique em **Create**.

## 4. 🎉 Tudo Pronto! Copie suas Chaves
Uma janelinha vai abrir com dois códigos importantes:
- **Your Client ID:** (Parece com `123456-abcde.apps.googleusercontent.com`)
- **Your Client Secret:** (Um código esquisito)

Esses são os valores que você deve colocar no arquivo `.env` da sua VPS ou me repassar para eu configurar.

--- 

### Exemplo de como ficará no .env:
```ini
GOOGLE_CLIENT_ID=seu-codigo-aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-segredo-aqui
```
