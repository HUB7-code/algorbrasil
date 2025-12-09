// ============================================
// API CLIENT - ALGOR BRASIL (PYTHON FASTAPI VERSION)
// ============================================

const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? "http://127.0.0.1:8001/api/v1"
    : "/api/v1";

class AlgorAPI {
    constructor() {
        this.endpoints = {
            newsletter: `${API_BASE_URL}/forms/newsletter`,
            association: `${API_BASE_URL}/forms/association`,
            stats: `${API_BASE_URL}/stats/public`
        };
    }

    // Obter estatísticas públicas (Contador de Membros)
    async getPublicStats() {
        try {
            const response = await fetch(this.endpoints.stats);
            if (!response.ok) return null;
            return await response.json();
        } catch (e) {
            console.warn("Stats API Error: ", e);
            return null;
        }
    }

    // Inscrição na newsletter
    async subscribeNewsletter(email) {
        try {
            const response = await fetch(this.endpoints.newsletter, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Erro ao processar inscrição');
            }

            return await response.json();
        } catch (e) {
            console.error("API Error: ", e);
            throw new Error('Erro de conexão. Tente novamente mais tarde.');
        }
    }

    // Solicitação de associação
    async submitAssociation(data) {
        try {
            const response = await fetch(this.endpoints.association, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Erro ao processar solicitação');
            }

            return await response.json();
        } catch (e) {
            console.error("API Error: ", e);
            throw new Error('Erro de conexão. Tente novamente mais tarde.');
        }
    }
}

// Instância global da API
const api = new AlgorAPI();

// ============================================
// FORMULÁRIO DE NEWSLETTER
// ============================================

class NewsletterForm {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (!this.form) return;

        this.emailInput = this.form.querySelector('input[name="email"]');
        this.submitButton = this.form.querySelector('button[type="submit"]');

        // Proteção contra elementos não encontrados
        if (!this.emailInput || !this.submitButton) {
            console.warn("Newsletter elements not found inside form");
            return;
        }

        this.originalButtonText = this.submitButton.textContent;
        this.init();
    }

    init() {
        // Remover action padrão do PHP se existir
        this.form.removeAttribute('action');
        this.form.removeAttribute('method');

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const email = this.emailInput.value.trim();

        if (!this.validateEmail(email)) {
            this.showError('Por favor, insira um email válido');
            return;
        }

        this.setLoading(true);

        try {
            const response = await api.subscribeNewsletter(email);
            this.showSuccess(response.message || 'Inscrição realizada com sucesso!');
            this.form.reset();
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    setLoading(isLoading) {
        this.submitButton.disabled = isLoading;
        this.emailInput.disabled = isLoading;

        if (isLoading) {
            this.submitButton.innerHTML = `Enviando...`;
        } else {
            this.submitButton.textContent = this.originalButtonText;
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const existingNotification = document.querySelector('.algor-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `algor-notification algor-notification-${type}`;
        notification.innerHTML = `
      <div class="algor-notification-content">
        <span class="algor-notification-icon">${type === 'success' ? '✓' : '✕'}</span>
        <span class="algor-notification-message">${message}</span>
      </div>
    `;

        // Estilos e Animação
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: type === 'success' ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)',
            color: 'white',
            zIndex: '9999',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            transform: 'translateY(100px)',
            opacity: '0',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            fontSize: '14px'
        });

        document.body.appendChild(notification);

        // Trigger animation
        requestAnimationFrame(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        });

        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
}

// ============================================
// FORMULÁRIO DE ASSOCIAÇÃO
// ============================================

class AssociationForm {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (!this.form) return;

        this.submitButton = this.form.querySelector('button[type="submit"]');

        if (!this.submitButton) {
            console.warn("Association submit button not found");
            return;
        }

        this.originalButtonText = this.submitButton.textContent;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            empresa: formData.get('empresa') || '',
            cargo: formData.get('cargo') || '',
            interesse: formData.get('interesse') || '',
            mensagem: formData.get('mensagem') || ''
        };

        this.setLoading(true);

        try {
            const response = await api.submitAssociation(data);
            this.showSuccess(response.message);
            this.form.reset();
            setTimeout(() => {
                // Opcional: Redirecionar para página de agradecimento
                // window.location.href = 'obrigado.html';
            }, 2000);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        this.submitButton.disabled = isLoading;
        if (isLoading) {
            this.submitButton.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
            `;
        } else {
            this.submitButton.textContent = this.originalButtonText;
        }
    }

    showSuccess(message) {
        // Reutiliza a lógica de notificação
        new NewsletterForm('body').showNotification(message, 'success');
    }

    showError(message) {
        new NewsletterForm('body').showNotification(message, 'error');
    }
}

// ============================================
// INICIALIZAÇÃO E UTILITÁRIOS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Newsletter (pode ter múltiplos forms com essa classe/seletor)
    const newsletterForms = document.querySelectorAll('form[action="enviar-email.php"]');
    if (newsletterForms.length > 0) {
        newsletterForms.forEach(form => {
            // Cria uma instância temporária para gerenciar este form específico
            // Idealmente refatoraríamos para passar o elemento form direto, 
            // mas mantendo compatibilidade com o construtor 'selector string'
            // vamos apenas garantir que o seletor é específico ou usar o ID se tiver.
            // Para simplicidade aqui na Home, assumimos o footer form padrão.
        });
        // Inicializa o principal do footer
        new NewsletterForm('footer form');
    }

    // Inicializar Formulário de Associação
    if (document.querySelector('#form-associacao') || window.location.pathname.includes('associe-se')) {
        new AssociationForm('form');
        // Nota: Garanta que o form na pag associe-se tenha um seletor compatível ou use um ID específico
    }

    // Utilitário: Focar no campo de email ao clicar em "Assinar Newsletter"
    const newsletterLinks = document.querySelectorAll('a[href="#footer"]');
    newsletterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // O scroll suave já é tratado pelo script do index.html
            // Aqui damos o foco visual
            setTimeout(() => {
                const emailInput = document.querySelector('footer input[type="email"]');
                if (emailInput) {
                    emailInput.focus();
                    emailInput.parentElement.classList.add('ring-2', 'ring-brand-copper');
                    setTimeout(() => {
                        emailInput.parentElement.classList.remove('ring-2', 'ring-brand-copper');
                    }, 2000);
                }
            }, 1000); // Tempo para o scroll acontecer
        });
    });

    // Carregar Contagem de Membros (Hero Section)
    const memberCountElement = document.getElementById('member-count');
    if (memberCountElement) {
        api.getPublicStats().then(data => {
            if (data && data.members_count !== undefined) {
                // Animação simples de contagem
                const target = data.members_count;
                let current = 0;
                const increment = Math.max(1, Math.ceil(target / 40));
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    memberCountElement.textContent = current;
                }, 30);
            }
        });
    }
});
