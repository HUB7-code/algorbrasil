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
            // Fetch real organizations from API
            const token = localStorage.getItem("algor_token");
            if (!token) {
                setIsLoading(false);
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations/me`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setOrganizations(data);

                // Restore selection if valid
                const savedOrgId = localStorage.getItem("algor_selected_org_id");
                if (savedOrgId) {
                    const found = data.find((o: Organization) => o.id === Number(savedOrgId));
                    if (found) setCurrentOrganization(found);
                }
            } else {
                console.error("Failed to fetch organizations");
                // If auth fails/token invalid, maybe clear data
                setOrganizations([]);
            }

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
