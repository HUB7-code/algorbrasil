/**
 * Site Configuration
 * Centralizes all institutional data and external links
 */

export const SITE_CONFIG = {
    name: 'ALGOR Association',
    domain: 'algorbrasil.com.br',
    links: {
        calendly: {
            diagnostic: 'https://calendly.com/algorbrasil/diagnostico-n7',
            specialist: 'https://calendly.com/algorbrasil/diagnostico-n7', // Recomended same for MVP
        },
        members: '/dashboard',
        kitDownload: '/dashboard',
    },
    stats: {
        globalMembers: 250,
        brazilConsultants: 25,
        regions: 6,
    },
    authorities: [
        'ISO/IEC 42001',
        'AIMS',
        'PL 2338',
        'EU AI Act',
        'LGPD',
    ]
};
