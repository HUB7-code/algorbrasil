export default function CreateAssetModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;
    return <div className="fixed inset-0 bg-black/80 flex justify-center items-center"><div className="bg-gray-900 p-8 text-white"><p>Create Asset Modal Placeholder</p><button onClick={onClose} className="px-4 py-2 bg-blue-600">Close</button></div></div>;
}
