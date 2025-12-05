const Joi = require('joi');

// Schema de validação para newsletter
const newsletterSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required()
        .max(255)
        .trim()
        .lowercase()
        .messages({
            'string.email': 'Email inválido',
            'string.empty': 'Email é obrigatório',
            'string.max': 'Email muito longo'
        })
});

// Schema de validação para associação
const associacaoSchema = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(100)
        .required()
        .trim()
        .pattern(/^[a-zA-ZÀ-ÿ\s]+$/)
        .messages({
            'string.min': 'Nome deve ter pelo menos 3 caracteres',
            'string.max': 'Nome muito longo',
            'string.empty': 'Nome é obrigatório',
            'string.pattern.base': 'Nome deve conter apenas letras'
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required()
        .max(255)
        .trim()
        .lowercase()
        .messages({
            'string.email': 'Email inválido',
            'string.empty': 'Email é obrigatório'
        }),

    empresa: Joi.string()
        .max(200)
        .trim()
        .allow('')
        .optional(),

    cargo: Joi.string()
        .max(100)
        .trim()
        .allow('')
        .optional(),

    interesse: Joi.string()
        .valid('governanca', 'compliance', 'tecnico', 'etica')
        .optional()
        .messages({
            'any.only': 'Área de interesse inválida'
        }),

    mensagem: Joi.string()
        .max(1000)
        .trim()
        .allow('')
        .optional()
        .messages({
            'string.max': 'Mensagem muito longa (máximo 1000 caracteres)'
        })
});

// Middleware de validação
const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, // Retorna todos os erros
            stripUnknown: true // Remove campos desconhecidos
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path[0],
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors
            });
        }

        // Substitui req.body pelos dados validados e sanitizados
        req.body = value;
        next();
    };
};

module.exports = {
    validateNewsletter: validate(newsletterSchema),
    validateAssociacao: validate(associacaoSchema)
};
