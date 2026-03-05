import { useState, useEffect } from 'react';

export interface ScannerStats {
    risk_score: number;
    previous_week_score: number;
    financial_summary: {
        totalExposure: number;
        mitigationSavings: number;
        legalRisk: number;
        operationalRisk: number;
        roiPercentage: number;
    };
    lgpd_risk: {
        exposurePercentage: number;
        cpfCount: number;
        geoCount: number;
        relevantArticle: string;
        potentialFine: number;
        severity: 'low' | 'medium' | 'high' | 'critical';
    };
    hallucination_risk: {
        lowConfidencePercentage: number;
        confirmedHallucinations: number;
        threshold: number;
        monthlyRiskCost: number;
        severity: 'low' | 'medium' | 'high' | 'critical';
    };
    security_risk: {
        blockedCount: number;
        injectionAttempts: number;
        lastAttemptTime: string;
        owaspReference: string;
        severity: 'low' | 'medium' | 'high' | 'critical';
    };
    trend_data: Array<{ name: string; compliance: number; risks: number }>;
    data_breakdown: Array<{ id: string; source: string; category: string; risk: 'Low' | 'Medium' | 'High' | 'Excessive'; compliance: number; lastAudit: string }>;
    action_items: Array<{ id: string; text: string; priority: 'low' | 'medium' | 'high'; status: 'pending' | 'completed' | 'urgent'; timeEstimate: string }>;
    recent_activity: Array<{ id: string; type: 'audit' | 'alert' | 'update' | 'user'; text: string; time: string; user?: string }>;
}

export function useComplianceScanner() {
    const [stats, setStats] = useState<ScannerStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem("algor_token");
            try {
                const res = await fetch("/api/v1/scanner/stats", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error("Falha ao carregar estatísticas do scanner");
                const data = await res.json();
                setStats(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}
