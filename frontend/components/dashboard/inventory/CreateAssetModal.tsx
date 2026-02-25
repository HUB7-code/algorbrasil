export default function CreateAssetModal({ isOpen, onClose, onAssetCreated }: { isOpen: boolean, onClose: () => void, onAssetCreated?: () => void }) {
    if (!isOpen) return null;
    return <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[100]"><div className="bg-gray-900 p-8 text-white rounded"><p className="mb-4">Create Asset Modal Placeholder</p><button onClick={onClose} className="px-4 py-2 bg-blue-600 rounded">Close</button></div></div>;
}
