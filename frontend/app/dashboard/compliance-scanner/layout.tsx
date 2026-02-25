export default function ComplianceScannerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0B0F1E]">
            {children}
        </div>
    );
}
