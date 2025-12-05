const express = require('express');
const router = express.Router();
const formController = require('../controllers/form.controller');
const { validateNewsletter, validateAssociacao } = require('../middleware/validator');
const { formLimiter } = require('../middleware/rateLimiter');

// ============================================
// ROTAS DE FORMULÁRIOS (COM PROTEÇÃO EXTRA)
// ============================================

// Newsletter - Rate limit + Validação
router.post('/newsletter',
    formLimiter, // Máximo 5 requisições por hora
    validateNewsletter, // Validação com Joi
    formController.newsletter
);

// Associação - Rate limit + Validação
router.post('/associacao',
    formLimiter, // Máximo 5 requisições por hora
    validateAssociacao, // Validação com Joi
    formController.associacao
);

module.exports = router;
