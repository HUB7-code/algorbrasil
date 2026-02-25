export default function CreateOrganizationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center">
            <div className="bg-[#0A1A2F] p-8 rounded-xl border border-white/10 text-white">
                <h2 className="text-xl mb-4">Novo Cliente (Em Desenvolvimento)</h2>
                <button onClick={onClose} className="px-4 py-2 bg-blue-600 rounded">Fechar</button>
            </div>
        </div>
    );
}
