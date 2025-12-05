const app = require('./app');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 URL Local: http://localhost:${PORT}`);
    console.log(`🌍 Acessível em: http://${HOST}:${PORT}`);
    console.log(`⚠️  Configure port forwarding no roteador para porta ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM recebido. Fechando servidor...');
    server.close(() => {
        console.log('Servidor fechado.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\nSIGINT recebido. Fechando servidor...');
    server.close(() => {
        console.log('Servidor fechado.');
        process.exit(0);
    });
});
