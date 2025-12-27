import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    subtext: string;
    icon: React.ReactNode;
    trend?: string;
    trendUp?: boolean;
    borderColor?: string;
    delay?: number;
}

export function StatCard({
    title,
    value,
    subtext,
    icon,
    trend,
    trendUp = true,
    borderColor = "border-white/5",
    delay = 0
}: StatCardProps) {
    return (
        <div
            className={`
                relative overflow-hidden group p-6 rounded-2xl
                bg-black/40 backdrop-blur-xl
                border ${borderColor}
                hover:border-brand-green/50 transition-all duration-500
                hover:shadow-[0_0_30px_rgba(0,255,148,0.05)]
                animate-in fade-in slide-in-from-bottom-4
            `}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
        >
            {/* Hover Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-brand-green/10 text-white/50 group-hover:text-brand-green transition-colors duration-300">
                    {icon}
                </div>
                {trend && (
                    <div className={`
                        flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full border
                        ${trendUp
                            ? 'bg-[#00FF94]/10 text-[#00FF94] border-[#00FF94]/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }
                    `}>
                        {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {trend}
                    </div>
                )}
            </div>

            <div className="relative z-10 space-y-1">
                <h3 className="text-3xl font-bold font-display text-white tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                    {value}
                </h3>
                <p className="text-xs font-bold text-brand-blue/60 uppercase tracking-widest text-[10px]">
                    {title}
                </p>
                <p className="text-xs text-brand-blue/40 font-mono mt-1 pt-2 border-t border-white/5">
                    {subtext}
                </p>
            </div>
        </div>
    );
}
