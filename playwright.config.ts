import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright para Testes E2E - ALGOR BRASIL
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests/e2e',

    // Timeout por teste (aumentado para 300s / 5 minutos)
    timeout: 300 * 1000,

    // Configurações globais
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    // Reporter
    reporter: [
        ['html', { outputFolder: 'tests/reports/html' }],
        ['json', { outputFile: 'tests/reports/results.json' }],
        ['list']
    ],

    // Configurações de uso
    use: {
        // URL base
        baseURL: 'http://localhost:3000',

        // Trace on first retry
        trace: 'on-first-retry',

        // Screenshots
        screenshot: 'only-on-failure',

        // Video
        video: 'retain-on-failure',

        // Viewport padrão
        viewport: { width: 1920, height: 1080 },
    },

    // Configuração de projetos (browsers)
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },

        // Mobile
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },

        // Tablet
        {
            name: 'iPad',
            use: { ...devices['iPad Pro'] },
        },
    ],

    // Web Server (opcional - se quiser que o Playwright inicie o servidor)
    // webServer: {
    //   command: 'npm run dev',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
