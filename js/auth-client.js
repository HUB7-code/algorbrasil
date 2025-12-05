/**
 * Cliente de Autenticação para o Backend Python (FastAPI)
 * Substitui o antigo SDK do Firebase.
 */

const API_BASE_URL = "http://127.0.0.1:8002/api/v1"; // Ajuste a porta se necessário

export const AuthClient = {
    /**
     * Realiza o login no backend e salva o token JWT.
     * @param {string} email 
     * @param {string} password 
     */
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Falha na autenticação");
            }

            const data = await response.json();

            // Salvar token e dados do usuário no LocalStorage
            localStorage.setItem("algor_token", data.access_token);
            localStorage.setItem("algor_user_email", email);

            return true;
        } catch (error) {
            console.error("Erro de Login:", error);
            throw error;
        }
    },

    /**
     * Verifica se o usuário está logado (tem token).
     * Se não estiver, redireciona para o login (opcional).
     * @param {boolean} redirectIfUnauth - Se true, chuta usuário não logado para login.html
     */
    checkAuth(redirectIfUnauth = false) {
        const token = localStorage.getItem("algor_token");

        if (!token) {
            if (redirectIfUnauth) {
                window.location.href = "login.html";
            }
            return false;
        }

        // TODO: Futuramente podemos validar a expiração do token aqui (decode JWT)
        return true;
    },

    /**
     * Retorna o email do usuário logado.
     */
    getUserEmail() {
        return localStorage.getItem("algor_user_email");
    },

    /**
     * Faz logout (limpa token e redireciona).
     */
    logout() {
        localStorage.removeItem("algor_token");
        localStorage.removeItem("algor_user_email");
        window.location.href = "index.html";
    }
};
