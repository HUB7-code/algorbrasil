export default function AssessmentWizard({ onCancel }: { onCancel?: () => void }) {
    return (
        <div className="p-8 text-white min-h-screen bg-[#0B0F1E]">
            <h2 className="text-2xl mb-4">Wizard de Avaliação (Em Manutenção)</h2>
            {onCancel && <button onClick={onCancel} className="px-6 py-2 bg-blue-600 rounded">Voltar</button>}
        </div>
    );
}
