const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
require('dotenv').config();

// Importar middlewares de segurança
const { securityHeaders, additionalSecurityHeaders } = require('./middleware/security');
const { generalLimiter, speedLimiter } = require('./middleware/rateLimiter');
const { requestLogger, logger } = require('./middleware/logger');

const app = express();

// ============================================
// CAMADA 1: HEADERS DE SEGURANÇA
// ============================================
app.use(securityHeaders);
app.use(additionalSecurityHeaders);

// ============================================
// CAMADA 2: LOGGING E MONITORAMENTO
// ============================================
app.use(requestLogger);

// ============================================
// CAMADA 3: CORS CONFIGURADO
// ============================================
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        // Permite requisições sem origin (mobile apps, Postman, etc)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            logger.warn(`CORS blocked origin: ${origin}`);
            callback(new Error('Origem não permitida pelo CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400 // 24 horas
};

app.use(cors(corsOptions));

// ============================================
// CAMADA 4: BODY PARSER COM LIMITES
// ============================================
app.use(express.json({
    limit: '10kb', // Limita tamanho do body para prevenir ataques
    verify: (req, res, buf) => {
        // Verifica se o JSON é válido
        try {
            JSON.parse(buf);
        } catch (e) {
            logger.warn('Invalid JSON received', { ip: req.ip });
            throw new Error('JSON inválido');
        }
    }
}));

app.use(express.urlencoded({
    extended: true,
    limit: '10kb',
    parameterLimit: 20 // Limita número de parâmetros
}));

// ============================================
// CAMADA 5: SANITIZAÇÃO DE DADOS
// ============================================

// Previne NoSQL injection
app.use(mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
        logger.warn('NoSQL injection attempt detected', {
            ip: req.ip,
            key: key,
            url: req.originalUrl
        });
    }
}));

// Previne HTTP Parameter Pollution
app.use(hpp({
    whitelist: [] // Lista de parâmetros que podem ser duplicados
}));

// ============================================
// CAMADA 6: RATE LIMITING
// ============================================
app.use(speedLimiter); // Desacelera requisições excessivas
app.use(generalLimiter); // Limita número de requisições

// ============================================
// CAMADA 7: PROTEÇÃO CONTRA TIMING ATTACKS
// ============================================
app.use((req, res, next) => {
    // Adiciona um pequeno delay aleatório para prevenir timing attacks
    const delay = Math.random() * 50; // 0-50ms
    setTimeout(next, delay);
});

// ============================================
// ROTAS PÚBLICAS
// ============================================

// Health check (sem rate limit)
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Status da API
app.get('/', (req, res) => {
    res.json({
        message: 'API Algor Brasil - Backend Seguro',
        version: '1.0.0',
        status: 'online',
        security: {
            helmet: 'enabled',
            cors: 'enabled',
            rateLimit: 'enabled',
            sanitization: 'enabled',
            logging: 'enabled'
        }
    });
});

// ============================================
// ROTAS DA API
// ============================================
const formRoutes = require('./routes/form.routes');
app.use('/api/forms', formRoutes);

// ============================================
// CAMADA 8: ERROR HANDLING
// ============================================

// Handler de erros do CORS
app.use((err, req, res, next) => {
    if (err.message === 'Origem não permitida pelo CORS') {
        return res.status(403).json({
            success: false,
            error: 'Acesso negado - Origem não autorizada'
        });
    }
    next(err);
});

// Handler de erros de JSON inválido
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        logger.warn('Invalid JSON syntax', { ip: req.ip });
        return res.status(400).json({
            success: false,
            error: 'JSON inválido'
        });
    }
    next(err);
});

// Handler geral de erros
app.use((err, req, res, next) => {
    logger.error('Unhandled error', {
        error: err.message,
        stack: err.stack,
        ip: req.ip,
        url: req.originalUrl
    });

    // Não expõe detalhes do erro em produção
    const errorMessage = process.env.NODE_ENV === 'production'
        ? 'Erro interno do servidor'
        : err.message;

    res.status(err.status || 500).json({
        success: false,
        error: errorMessage
    });
});

// Handler de rotas não encontradas (404)
app.use((req, res) => {
    logger.warn('Route not found', {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip
    });

    res.status(404).json({
        success: false,
        error: 'Rota não encontrada'
    });
});

module.exports = app;
