export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#0A1A2F]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-[#00FF94]/20 border-t-[#00FF94] rounded-full animate-spin" />
                    <div className="absolute inset-2 border-4 border-transparent border-b-[#00A3FF] rounded-full animate-spin-reverse" />
                </div>
                <p className="text-[#00FF94] font-mono text-xs tracking-[0.2em] animate-pulse">
                    CARREGANDO SISTEMA
                </p>
            </div>
        </div>
    );
}
