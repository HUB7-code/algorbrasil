"use client";

import { useState, useEffect, useRef } from "react";
import { useOrganization } from "@/context/OrganizationContext";

import CreateOrganizationModal from "./CreateOrganizationModal";

export default function OrganizationSwitcher() {
    const { currentOrganization, organizations, setCurrentOrganization, isLoading } = useOrganization();
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (isLoading) return <div className="h-12 bg-white/5 animate-pulse rounded-xl mx-4 mb-4" />;

    return (
        <div className="px-4 mb-6 relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-200 group"
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue border border-brand-blue/30">
                        <span className="material-symbols-rounded text-lg">
                            {currentOrganization?.role === 'owner' ? 'domain' : 'business_center'}
                        </span>
                    </div>
                    <div className="text-left flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                            {currentOrganization ? 'Organização' : 'Workspace'}
                        </p>
                        <p className="text-sm font-bold text-white truncate">
                            {currentOrganization?.name || "Pessoal (Padrão)"}
                        </p>
                        {currentOrganization && currentOrganization.plan_tier !== 'enterprise' && (
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${(currentOrganization.credits_balance || 0) > 0
                                        ? 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30'
                                        : 'bg-red-500/20 text-red-500 border border-red-500/30'
                                    }`}>
                                    {(currentOrganization.credits_balance || 0) > 0
                                        ? `${currentOrganization.credits_balance} Créditos`
                                        : 'Esgotado'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <span className={`material-symbols-rounded text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-4 right-4 mt-2 bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                    <div className="p-2 space-y-1">
                        {/* Personal Option */}
                        <button
                            onClick={() => {
                                setCurrentOrganization(null);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${!currentOrganization ? 'bg-brand-blue/20 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <span className="material-symbols-rounded text-lg">person</span>
                            <span className="text-sm font-medium">Pessoal (Padrão)</span>
                            {!currentOrganization && <span className="ml-auto material-symbols-rounded text-sm">check</span>}
                        </button>

                        <div className="h-[1px] bg-white/5 my-1" />

                        {/* Organizations List */}
                        {organizations.map((org) => (
                            <button
                                key={org.id}
                                onClick={() => {
                                    setCurrentOrganization(org);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${currentOrganization?.id === org.id ? 'bg-brand-blue/20 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <span className="material-symbols-rounded text-lg">
                                    {org.role === 'owner' ? 'domain' : 'business_center'}
                                </span>
                                <span className="text-sm font-medium truncate">{org.name}</span>
                                {currentOrganization?.id === org.id && <span className="ml-auto material-symbols-rounded text-sm">check</span>}
                            </button>
                        ))}
                    </div>
                    <div className="p-2 border-t border-white/5 bg-white/5">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setIsModalOpen(true);
                            }}
                            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-all text-xs font-medium"
                        >
                            <span className="material-symbols-rounded text-sm">add</span>
                            Nova Organização
                        </button>
                    </div>
                </div>
            )}

            <CreateOrganizationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
