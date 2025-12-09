import { AuthClient } from './auth-client.js';

const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? "http://127.0.0.1:8001/api/v1"
    : "/api/v1";

export class DownloadManager {
    static async downloadFile(filename, label) {
        const token = AuthClient.getToken();
        if (!token) {
            alert("Sessão expirada. Por favor, faça login novamente.");
            AuthClient.logout();
            return;
        }

        try {
            // Feedback visual no cursor/botão seria ideal, mas alerta simples por enquanto
            const originalCursor = document.body.style.cursor;
            document.body.style.cursor = 'wait';

            const response = await fetch(`${API_BASE_URL}/downloads/${filename}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    alert("Acesso negado. Faça login novamente.");
                    AuthClient.logout();
                } else if (response.status === 404) {
                    alert("Arquivo não encontrado no servidor.");
                } else {
                    alert("Erro ao baixar arquivo. Tente novamente.");
                }
                throw new Error(`Download failed: ${response.status}`);
            }

            // Criar Blob e Download Link
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = label || filename; // Nome para salvar
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (error) {
            console.error("Download error:", error);
        } finally {
            document.body.style.cursor = 'default';
        }
    }
}
