import { InputHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelSuffix?: React.ReactNode;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, labelSuffix, error, type = "text", ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <div className="flex items-center">
                        <label className="block text-xs font-mono text-brand-blue uppercase tracking-wider">
                            {label}
                        </label>
                        {labelSuffix && <span className="ml-2">{labelSuffix}</span>}
                    </div>
                )}
                <div className="relative group">
                    <input
                        type={type}
                        className={cn(
                            "flex h-12 w-full rounded-lg border border-white/10 bg-brand-navy/60 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-brand-green/50 focus:bg-brand-navy/80 focus:outline-none focus:ring-1 focus:ring-brand-green/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 backdrop-blur-sm",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-green/20 to-brand-blue/20 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500" />
                </div>
                {error && (
                    <p className="text-xs text-red-500 font-mono animate-pulse">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
