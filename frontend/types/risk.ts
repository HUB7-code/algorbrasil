export interface Risk {
    id?: number;
    category: string;
    description: string;
    affected_system: string;
    probability: number;
    impact: number;
    risk_level?: number; // Backend calculates this, frontend might display mock
    strategy: string; // 'Mitigar' | 'Aceitar' | 'Transferir' | 'Evitar'
    status: string; // 'Aberto' | 'Em Tratamento' | 'Mitigado' ...
    mitigation_plan?: string;
    owner?: string;
    organization_id?: number;
    created_at?: string;
}
