import AssessmentWizard from "@/components/dashboard/assessments/AssessmentWizard";

export default function NewAssessmentPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
            <div className="text-center mb-12 space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="inline-block py-1.5 px-4 rounded-full bg-[#1E1F20] border border-[#444746] text-[#C4C7C5] text-xs font-medium tracking-wide">
                    Diagnóstico ISO/IEC 42001
                </span>
                <h1 className="text-3xl md:text-4xl font-normal text-[#E3E3E3] max-w-2xl mx-auto leading-tight">
                    Avaliação de Maturidade IA
                </h1>
                <p className="text-[#C4C7C5] max-w-xl mx-auto text-base">
                    Assistente de governança para mapeamento de riscos iniciais.
                </p>
            </div>

            <AssessmentWizard />
        </div>
    );
}
