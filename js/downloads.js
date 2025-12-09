import { AuthClient } from './auth-client.js';

const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? "http://127.0.0.1:8001/api/v1"
    : "/api/v1";

export class DownloadManager {
    static async downloadFile(filename, label) {
        console.log(`[DownloadManager] Iniciando download: ${filename}`);
        const token = AuthClient.getToken();

        if (!token) {
            console.warn("[DownloadManager] Token não encontrado.");
            alert("Sessão expirada. Por favor, faça login novamente.");
            AuthClient.logout();
            return;
        }

        try {
            document.body.style.cursor = 'wait';

            // Debug: Mostrar URL
            const url = `${API_BASE_URL}/downloads/${filename}`;
            console.log(`[DownloadManager] Fetching: ${url}`);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(`[DownloadManager] Response status: ${response.status}`);

            if (!response.ok) {
                if (response.status === 401) {
                    alert("Acesso negado. Token inválido.");
                    AuthClient.logout();
                } else if (response.status === 404) {
                    alert("Arquivo não encontrado no servidor (404).");
                } else {
                    const txt = await response.text();
                    console.error("Erro Backend:", txt);
                    alert(`Erro ao baixar: ${response.status}`);
                }
                throw new Error(`Download failed: ${response.status}`);
            }

            // Criar Blob e Download Link
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = label || filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);
            console.log("[DownloadManager] Download iniciado com sucesso.");

        } catch (error) {
            console.error("Download error:", error);
            alert("Erro de conexão. Verifique o console.");
        } finally {
            document.body.style.cursor = 'default';
        }
    }
}
