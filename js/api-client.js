import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ============================================
// API CLIENT - ALGOR BRASIL (FIREBASE VERSION)
// ============================================

class AlgorAPI {
    constructor() {
        this.collectionNewsletter = 'newsletter';
        this.collectionAssociacao = 'associacoes';
    }

    // Inscrição na newsletter
    async subscribeNewsletter(email) {
        try {
            const docRef = await addDoc(collection(db, this.collectionNewsletter), {
                email: email,
                createdAt: serverTimestamp(),
                source: 'website_footer'
            });
            console.log("Newsletter signup ID: ", docRef.id);
            return { message: 'Inscrição realizada com sucesso!' };
        } catch (e) {
            console.error("Error adding document: ", e);
            throw new Error('Erro ao salvar inscrição. Tente novamente.');
        }
    }

    // Solicitação de associação
    async submitAssociation(data) {
        try {
            const docRef = await addDoc(collection(db, this.collectionAssociacao), {
                ...data,
                createdAt: serverTimestamp(),
                status: 'pending'
            });
            console.log("Association request ID: ", docRef.id);
            return { message: 'Solicitação enviada com sucesso! Entraremos em contato.' };
        } catch (e) {
            console.error("Error adding document: ", e);
            throw new Error('Erro ao enviar solicitação. Tente novamente.');
        }
    }

    // Health check (Simulado para compatibilidade)
    async healthCheck() {
        return { status: 'online', mode: 'firebase' };
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

        this.emailInput = this.form.querySelector('input[type="email"]');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.originalButtonText = this.submitButton.textContent;

        this.init();
    }

    init() {
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
            this.showSuccess(response.message);
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

        // Estilos inline para garantir que apareça mesmo sem CSS externo carregado
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '16px';
        notification.style.borderRadius = '8px';
        notification.style.backgroundColor = type === 'success' ? '#10B981' : '#EF4444';
        notification.style.color = 'white';
        notification.style.zIndex = '9999';
        notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.gap = '12px';
        notification.style.animation = 'slideIn 0.3s ease-out';

        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 5000);
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
                window.location.href = 'index.html#conteudo';
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
        // Reutiliza a lógica de notificação
        new NewsletterForm('body').showNotification(message, type);
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    new NewsletterForm('footer form');
    if (window.location.pathname.includes('associe-se')) {
        new AssociationForm('form');
    }
});
