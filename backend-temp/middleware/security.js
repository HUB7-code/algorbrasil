const helmet = require('helmet');

// Configuração avançada do Helmet para máxima segurança
const securityHeaders = helmet({
    // Content Security Policy - Previne XSS
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"], // Permite estilos inline (necessário para alguns frameworks)
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },

    // Strict Transport Security - Força HTTPS
    hsts: {
        maxAge: 31536000, // 1 ano
        includeSubDomains: true,
        preload: true
    },

    // Previne clickjacking
    frameguard: {
        action: 'deny'
    },

    // Previne MIME type sniffing
    noSniff: true,

    // Desabilita cache de DNS prefetching
    dnsPrefetchControl: {
        allow: false
    },

    // Previne que o navegador envie o Referrer
    referrerPolicy: {
        policy: 'no-referrer'
    },

    // Remove o header X-Powered-By
    hidePoweredBy: true,

    // Previne que o navegador abra downloads automaticamente
    ieNoOpen: true,

    // Desabilita o XSS filter do navegador (usamos nossa própria proteção)
    xssFilter: true
});

// Middleware adicional para headers customizados
const additionalSecurityHeaders = (req, res, next) => {
    // Previne que a página seja embedada em iframes
    res.setHeader('X-Frame-Options', 'DENY');

    // Previne MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Habilita proteção XSS do navegador
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Política de permissões
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    // Remove informações do servidor
    res.removeHeader('X-Powered-By');
    res.removeHeader('Server');

    next();
};

module.exports = {
    securityHeaders,
    additionalSecurityHeaders
};
