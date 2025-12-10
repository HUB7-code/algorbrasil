
import React from 'react';
import { Info } from 'lucide-react';

interface LegalTooltipProps {
    content: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
}

export default function LegalTooltip({ content, side = 'top' }: LegalTooltipProps) {
    return (
        <div className="group relative inline-flex items-center ml-2 align-middle">
            <Info className="w-4 h-4 text-gray-400 hover:text-[#00FF94] transition-colors cursor-help" />

            {/* Tooltip Container */}
            <div className={`
        absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100
        transition-all duration-300 transform scale-95 group-hover:scale-100
        w-64 p-3 rounded-lg border border-[#00FF94]/20 
        bg-[#0A1A2F]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]
        text-xs text-gray-300 leading-relaxed
        ${side === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : ''}
        ${side === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-2' : ''}
        ${side === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' : ''}
        ${side === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2' : ''}
      `}>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-[#00FF94]/5 blur-md pointer-events-none" />

                {/* Content */}
                <span className="relative z-10">
                    <strong className="block text-[#00FF94] mb-1">Finalidade (LGPD)</strong>
                    {content}
                </span>

                {/* Arrow (Simple CSS triangle) */}
                <div className={`
            absolute w-2 h-2 bg-[#0A1A2F] border-r border-b border-[#00FF94]/20 transform rotate-45
            ${side === 'top' ? 'bottom-[-5px] left-1/2 -translate-x-1/2' : ''}
            ${side === 'right' ? 'left-[-5px] top-1/2 -translate-y-1/2 border-r-0 border-b-0 border-l border-t' : ''}
        `} />
            </div>
        </div>
    );
}
