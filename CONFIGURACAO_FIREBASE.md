# 🔧 Guia de Configuração do Firebase (Passo a Passo)

Para que a **Área de Membros**, o **Login** e os **Formulários** funcionem, precisamos conectar o site ao Firebase (serviço do Google que cuida do banco de dados e autenticação).

Siga os passos abaixo. É rápido e gratuito.

---

## 1. Criar o Projeto no Firebase

1.  Acesse o [Console do Firebase](https://console.firebase.google.com/).
2.  Faça login com sua conta do Google.
3.  Clique em **"Adicionar projeto"** (ou "Create a project").
4.  Dê um nome ao projeto (ex: `Algor Brasil`).
5.  Desative o Google Analytics por enquanto (para simplificar) e clique em **"Criar projeto"**.
6.  Aguarde e clique em **"Continuar"**.

---

## 2. Registrar o Site (Web App)

1.  Na tela inicial do seu projeto, clique no ícone de **Web** (parece com `</>`).
2.  No campo "Apelido do app", digite `Site Algor`.
3.  Não precisa marcar a opção "Firebase Hosting" agora.
4.  Clique em **"Registrar app"**.
5.  Vai aparecer um código com `const firebaseConfig = { ... }`. **Não feche essa tela ainda!**

---

## 3. Configurar o Código do Site

1.  Copie apenas o trecho que está entre as chaves `{ }` do `firebaseConfig`. Deve se parecer com isso:
    ```javascript
    apiKey: "AIzaSyDOCAbC...",
    authDomain: "algor-brasil.firebaseapp.com",
    projectId: "algor-brasil",
    storageBucket: "algor-brasil.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
    ```
2.  Volte aqui no VS Code.
3.  Abra o arquivo: `js/firebase-init.js`.
4.  Substitua o conteúdo das linhas 6 a 13 pelo código que você copiou.

---

## 4. Ativar Autenticação (Login)

1.  Volte ao Console do Firebase.
2.  No menu lateral esquerdo, clique em **"Criação"** > **"Authentication"**.
3.  Clique em **"Vamos começar"**.
4.  Na aba "Sign-in method" (Método de login), clique em **"E-mail/senha"**.
5.  Ative a chave **"Ativar"** e clique em **"Salvar"**.
6.  (Opcional) Vá na aba "Users" e clique em "Adicionar usuário" para criar uma conta de teste para você (ex: `admin@algor.com` / `senha123`).

---

## 5. Ativar Banco de Dados (Firestore)

1.  No menu lateral esquerdo, clique em **"Criação"** > **"Firestore Database"**.
2.  Clique em **"Criar banco de dados"**.
3.  Escolha o local (pode deixar o padrão ou escolher `sao-paulo` se disponível).
4.  Na etapa de regras de segurança, escolha **"Iniciar no modo de teste"** (isso permite que o site salve dados sem bloqueios iniciais).
    *   *Nota: Em produção, configuraremos regras mais estritas.*
5.  Clique em **"Criar"**.

---

## ✅ Pronto!

Agora seu site já tem um backend completo funcionando!

- **Teste o Login:** Abra `login.html`, use o usuário que criou e veja se entra no Dashboard.
- **Teste a Newsletter:** Vá no rodapé do `index.html` e tente se inscrever. O email deve aparecer na coleção `newsletter` no seu Firestore.
