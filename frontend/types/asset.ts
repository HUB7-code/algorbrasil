export interface Asset {
    id?: number;
    name: string;
    department?: string;
    type: string;
    risk_level: string; // Matches API
    data_types?: string; // Matches API
    status?: string;
    description?: string;
    organization_id?: number;
}
