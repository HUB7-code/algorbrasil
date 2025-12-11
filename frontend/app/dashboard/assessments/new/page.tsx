import AssessmentWizard from "@/components/dashboard/assessments/AssessmentWizard";

export default function NewAssessmentPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
            <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="inline-block py-1 px-3 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-[10px] font-mono tracking-widest uppercase">
                    Diagnóstico ISO/IEC 42001 (Preview)
                </span>
                <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white max-w-3xl mx-auto leading-tight">
                    Avaliação de Maturidade de <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-white to-brand-green">Governança de IA</span>
                </h1>
                <p className="text-brand-blue/60 max-w-2xl mx-auto text-lg font-light">
                    Este assistente guiará você por 5 perguntas essenciais para mapear os riscos iniciais da sua operação de Inteligência Artificial.
                </p>
            </div>

            <AssessmentWizard />
        </div>
    );
}
