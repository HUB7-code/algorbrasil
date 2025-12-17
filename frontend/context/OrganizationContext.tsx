"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Organization = {
    id: number;
    name: string;
    role: string; // 'owner' | 'member'
};

type OrganizationContextType = {
    currentOrganization: Organization | null;
    organizations: Organization[];
    setCurrentOrganization: (org: Organization | null) => void;
    refreshOrganizations: () => Promise<void>;
    isLoading: boolean;
};

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
    const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load initial state (mock for now, should replace with API call)
    const refreshOrganizations = async () => {
        setIsLoading(true);
        try {
            // TODO: Replace with actual API call to /api/v1/users/me/organizations
            // For now, we simulate a delay and some data if user is logged in
            const token = localStorage.getItem("algor_token");
            if (!token) return;

            // Mock Data for SaaS Demo
            const mockOrgs: Organization[] = [
                { id: 1, name: "Consultoria Pessoal (Workspace)", role: 'owner' },
                { id: 101, name: "Acme Corp (Cliente)", role: 'member' },
                { id: 102, name: "Stark Industries (Cliente)", role: 'member' }
            ];

            // In a real implementation:
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/organizations`);
            // const data = await res.json();

            setOrganizations(mockOrgs);

            // Restore selection or default to Personal (null or id=1 depending on logic)
            // Here we use null to mean "Personal/No Org" context if we want separate,
            // or we treat "Personal" as just another Org in the list.
            // Let's treat Personal as "null" org_id for API compatibility with "Personal Workspace"

            const savedOrgId = localStorage.getItem("algor_selected_org_id");
            if (savedOrgId) {
                const found = mockOrgs.find(o => o.id === Number(savedOrgId));
                if (found) setCurrentOrganization(found);
            }

        } catch (error) {
            console.error("Failed to load organizations", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshOrganizations();
    }, []);

    const handleSetOrganization = (org: Organization | null) => {
        setCurrentOrganization(org);
        if (org) {
            localStorage.setItem("algor_selected_org_id", String(org.id));
        } else {
            localStorage.removeItem("algor_selected_org_id");
        }
    };

    return (
        <OrganizationContext.Provider value={{
            currentOrganization,
            organizations,
            setCurrentOrganization: handleSetOrganization,
            refreshOrganizations,
            isLoading
        }}>
            {children}
        </OrganizationContext.Provider>
    );
}

export function useOrganization() {
    const context = useContext(OrganizationContext);
    if (context === undefined) {
        throw new Error('useOrganization must be used within an OrganizationProvider');
    }
    return context;
}
