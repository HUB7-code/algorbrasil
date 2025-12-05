const emailService = require('../utils/email.service');
const { logger, logSuspiciousActivity } = require('../middleware/logger');

// ============================================
// CONTROLLER: NEWSLETTER
// ============================================
exports.newsletter = async (req, res) => {
    try {
        const { email } = req.body;

        // Log da tentativa
        logger.info('Newsletter subscription attempt', {
            email: email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Mascara email no log
            ip: req.ip
        });

        // Verificar se o email parece suspeito
        if (email.includes('test') || email.includes('spam')) {
            logSuspiciousActivity(req, 'Suspicious email pattern in newsletter');
        }

        // Enviar email
        await emailService.sendNewsletterConfirmation(email);

        logger.info('Newsletter subscription successful', {
            email: email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
            ip: req.ip
        });

        res.status(200).json({
            success: true,
            message: 'Inscrição realizada com sucesso! Verifique seu email.'
        });

    } catch (error) {
        logger.error('Newsletter subscription failed', {
            error: error.message,
            ip: req.ip
        });

        res.status(500).json({
            success: false,
            message: 'Erro ao processar inscrição. Tente novamente mais tarde.'
        });
    }
};

// ============================================
// CONTROLLER: ASSOCIAÇÃO
// ============================================
exports.associacao = async (req, res) => {
    try {
        const { nome, email, empresa, cargo, interesse, mensagem } = req.body;

        // Log da tentativa
        logger.info('Association request attempt', {
            nome,
            email: email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
            empresa,
            ip: req.ip
        });

        // Verificar padrões suspeitos
        const suspiciousPatterns = ['<script', 'javascript:', 'onerror=', 'onclick='];
        const allFields = [nome, email, empresa, cargo, mensagem].join(' ');

        if (suspiciousPatterns.some(pattern => allFields.toLowerCase().includes(pattern))) {
            logSuspiciousActivity(req, 'XSS attempt detected in association form');
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos detectados.'
            });
        }

        // Enviar emails
        await Promise.all([
            emailService.sendAssociacaoNotification({
                nome,
                email,
                empresa,
                cargo,
                interesse,
                mensagem
            }),
            emailService.sendAssociacaoConfirmation(email, nome)
        ]);

        logger.info('Association request successful', {
            nome,
            email: email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
            ip: req.ip
        });

        res.status(200).json({
            success: true,
            message: 'Solicitação enviada com sucesso! Entraremos em contato em breve.'
        });

    } catch (error) {
        logger.error('Association request failed', {
            error: error.message,
            ip: req.ip
        });

        res.status(500).json({
            success: false,
            message: 'Erro ao processar solicitação. Tente novamente mais tarde.'
        });
    }
};
