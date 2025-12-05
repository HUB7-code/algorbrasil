const winston = require('winston');
const path = require('path');

// Configurar formato de log
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Criar logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: { service: 'algorbrasil-backend' },
    transports: [
        // Log de erros em arquivo separado
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),

        // Log de todas as atividades
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),

        // Log de segurança (tentativas de ataque, etc)
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/security.log'),
            level: 'warn',
            maxsize: 5242880, // 5MB
            maxFiles: 10,
        })
    ],
});

// Em desenvolvimento, também loga no console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

// Middleware de logging de requisições
const requestLogger = (req, res, next) => {
    const start = Date.now();

    // Log quando a resposta terminar
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('user-agent')
        };

        if (res.statusCode >= 400) {
            logger.warn('Request failed', logData);
        } else {
            logger.info('Request completed', logData);
        }
    });

    next();
};

// Log de tentativas suspeitas
const logSuspiciousActivity = (req, reason) => {
    logger.warn('Suspicious activity detected', {
        reason,
        ip: req.ip || req.connection.remoteAddress,
        method: req.method,
        url: req.originalUrl,
        userAgent: req.get('user-agent'),
        body: req.body,
        timestamp: new Date().toISOString()
    });
};

// Log de erros
const logError = (error, req) => {
    logger.error('Application error', {
        error: error.message,
        stack: error.stack,
        ip: req?.ip || req?.connection?.remoteAddress,
        method: req?.method,
        url: req?.originalUrl,
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    logger,
    requestLogger,
    logSuspiciousActivity,
    logError
};
