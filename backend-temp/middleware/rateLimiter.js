const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Rate limiter geral - 100 requisições por 15 minutos
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    message: {
        error: 'Muitas requisições deste IP, tente novamente mais tarde.',
        retryAfter: '15 minutos'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter estrito para formulários - 5 requisições por hora
const formLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 5,
    message: {
        error: 'Limite de envios excedido. Tente novamente em 1 hora.',
        retryAfter: '1 hora'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false, // Conta mesmo requisições bem-sucedidas
});

// Rate limiter para autenticação - 5 tentativas por 15 minutos
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        error: 'Muitas tentativas de login. Conta bloqueada temporariamente.',
        retryAfter: '15 minutos'
    },
    skipSuccessfulRequests: true, // Não conta requisições bem-sucedidas
});

// Speed limiter - Desacelera após muitas requisições
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 50, // Começa a desacelerar após 50 requisições
    delayMs: (hits) => hits * 100, // Adiciona 100ms de delay por requisição extra
    maxDelayMs: 5000, // Delay máximo de 5 segundos
});

module.exports = {
    generalLimiter,
    formLimiter,
    authLimiter,
    speedLimiter
};
