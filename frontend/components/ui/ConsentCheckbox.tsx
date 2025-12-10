
import React from 'react';

interface ConsentCheckboxProps {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    required?: boolean;
}

export default function ConsentCheckbox({ id, checked, onChange, label, required = false }: ConsentCheckboxProps) {
    return (
        <div className="flex items-start gap-3 my-4 group">
            <div className="relative flex items-center h-5">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    required={required}
                    className="peer appearance-none w-5 h-5 border border-gray-600 rounded bg-[#050d18]/50 
                     checked:bg-[#00FF94] checked:border-[#00FF94] cursor-pointer transition-all duration-300
                     focus:ring-2 focus:ring-[#00FF94]/30 focus:outline-none"
                />
                {/* Helper custom checkmark icon */}
                <svg
                    className="absolute w-3.5 h-3.5 text-[#0A1A2F] left-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <label htmlFor={id} className="text-sm text-gray-400 cursor-pointer select-none group-hover:text-gray-300 transition-colors">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>
        </div>
    );
}
