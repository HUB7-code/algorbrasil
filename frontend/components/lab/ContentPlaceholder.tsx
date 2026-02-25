export default function ContentPlaceholder({ type, title }: { type: string, title?: string }) {
    return <div className="p-4 bg-gray-900 border border-gray-800 text-gray-500 rounded text-center">[{type.toUpperCase()}] {title} placeholder</div>;
}
