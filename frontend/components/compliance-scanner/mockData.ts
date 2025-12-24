// Mock Data: Banco Regional XYZ - AI Compliance Scanner
// Empresa fictícia com 3 meses de implementação de IA

export const companyProfile = {
    name: "Banco Regional XYZ",
    industry: "Financeiro",
    aiImplementationDate: "2025-09-15",
    monthlyRequests: 50000,
    currentMonth: "Dezembro 2025"
};

export const overviewMetrics = {
    riskScore: 7.2,
    previousWeekScore: 5.9,
    scoreChange: 1.3,
    scoreDirection: "up" as const,
    scoreTrend: "deteriorating" as const,
    lastUpdated: new Date().toISOString()
};

export const lgpdRiskData = {
    exposurePercentage: 18,
    totalExposures: 9000, // 18% of 50k
    cpfCount: 127,
    emailCount: 89,
    phoneCount: 45,
    geoCount: 43,
    fullNameCount: 234,
    potentialFine: 47000,
    relevantArticle: "LGPD Art. 5º X",
    severity: "critical" as const
};

export const hallucinationRiskData = {
    lowConfidencePercentage: 12,
    confirmedHallucinations: 34,
    totalEvaluated: 283,
    monthlyRiskCost: 23000,
    averageConfidenceScore: 0.73,
    threshold: 0.7,
    severity: "medium" as const
};

export const securityRiskData = {
    injectionAttempts: 5,
    blockedCount: 5,
    lastAttemptTime: "há 2 horas",
    owaspReference: "OWASP LLM01",
    threatLevel: "contained" as const,
    severity: "low" as const
};

export const financialSummary = {
    totalExposure: 187000,
    legalRisk: 94000,
    operationalRisk: 93000,
    mitigationSavings: 23000,
    roiPercentage: 340
};

export const dataBreakdown: Array<{
    type: string;
    exposures: number;
    severity: "high" | "medium" | "low";
    trend: "up" | "down" | "stable";
    action: "block" | "review" | "monitor";
}> = [
        { type: "CPF", exposures: 127, severity: "high", trend: "stable", action: "block" },
        { type: "Email", exposures: 89, severity: "medium", trend: "down", action: "review" },
        { type: "Telefone", exposures: 45, severity: "medium", trend: "up", action: "review" },
        { type: "Geolocalização", exposures: 43, severity: "high", trend: "up", action: "block" },
        { type: "Nome Completo", exposures: 234, severity: "low", trend: "stable", action: "monitor" }
    ];

export const actionItems: Array<{
    id: number;
    text: string;
    completed: boolean;
    priority: "critical" | "high" | "medium" | "low";
}> = [
        { id: 1, text: "Ativar filtro PII para endpoints de produção", completed: false, priority: "critical" },
        { id: 2, text: "Configurar hallucination threshold em 0.7", completed: false, priority: "high" },
        { id: 3, text: "Revisar 12 logs marcados como suspeitos", completed: false, priority: "medium" },
        { id: 4, text: "Atualizar política de retenção de dados", completed: true, priority: "low" }
    ];

// 30 days timeline data
export const timelineData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));

    const baseRequests = 1500 + Math.random() * 500;
    const riskVariation = 5 + Math.random() * 4;

    // Simulate some anomaly days
    const isAnomalyDay = i === 12 || i === 23;

    return {
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        fullDate: date.toISOString(),
        requests: Math.round(isAnomalyDay ? baseRequests * 1.5 : baseRequests),
        riskScore: parseFloat((isAnomalyDay ? riskVariation + 2 : riskVariation).toFixed(1)),
        piiExposures: Math.round(Math.random() * 15 + (isAnomalyDay ? 20 : 5)),
        hallucinations: Math.round(Math.random() * 5 + (isAnomalyDay ? 8 : 2)),
        event: isAnomalyDay ? (i === 12 ? "Novo modelo GPT-4o deployado" : "Pico de requisições detectado") : null
    };
});

export const modelDistribution = [
    { name: "GPT-4o", percentage: 45, requests: 22500, color: "#10B981" },
    { name: "GPT-4 Turbo", percentage: 25, requests: 12500, color: "#3B82F6" },
    { name: "Claude Sonnet", percentage: 20, requests: 10000, color: "#8B5CF6" },
    { name: "Claude Haiku", percentage: 10, requests: 5000, color: "#F59E0B" }
];

export const recentActivity: Array<{
    id: number;
    type: "pii" | "hallucination" | "injection" | "normal";
    message: string;
    timestamp: string;
    blocked: boolean;
}> = [
        { id: 1, type: "pii", message: "CPF detectado em prompt de atendimento", timestamp: "há 3 min", blocked: true },
        { id: 2, type: "hallucination", message: "Resposta com confiança 0.42 (abaixo limiar)", timestamp: "há 7 min", blocked: false },
        { id: 3, type: "injection", message: "Tentativa de jailbreak bloqueada", timestamp: "há 2 horas", blocked: true },
        { id: 4, type: "pii", message: "Geolocalização precisa em resposta", timestamp: "há 4 horas", blocked: true },
        { id: 5, type: "normal", message: "Batch de 150 requisições processado", timestamp: "há 5 horas", blocked: false }
    ];

export const complianceStatus = {
    lgpd: { percentage: 94, pending: 6, status: "compliant" as const },
    pl2338: { percentage: 67, pending: 12, status: "implementing" as const },
    iso42001: { percentage: 0, pending: 0, status: "not_started" as const }
};
