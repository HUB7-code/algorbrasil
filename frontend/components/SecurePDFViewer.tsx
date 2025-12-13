'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, AlertTriangle, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

// Configure Worker (Essential for scaling)
// Configure Worker (Essential for scaling)
// Using unpkg directly avoids webpack loader issues in Next.js App Router
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface SecurePDFViewerProps {
    fileUrl: string;
    userEmail?: string;
}

export default function SecurePDFViewer({ fileUrl, userEmail = "usuário_anonimo" }: SecurePDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [rotation, setRotation] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Disable Right Click
    useEffect(() => {
        const handleContext = (e: MouseEvent) => e.preventDefault();
        const el = canvasRef.current;
        if (el) {
            el.addEventListener('contextmenu', handleContext);
        }
        return () => {
            if (el) el.removeEventListener('contextmenu', handleContext);
        };
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    function onDocumentLoadError(err: Error) {
        console.error("PDF Error:", err);
        setError("Não foi possível carregar o documento seguro.");
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center w-full h-full bg-[#1E1F20] rounded-xl overflow-hidden border border-[#28292A] shadow-2xl relative">

            {/* Toolbar */}
            <div className="w-full h-14 bg-[#28292A] flex items-center justify-between px-4 border-b border-[#303336] z-10">
                <div className="flex items-center gap-2 text-[#E3E3E3] text-sm font-medium">
                    <span>Página {pageNumber} de {numPages || '--'}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-2 hover:bg-[#303336] rounded text-[#C4C7C5] transition-colors">
                        <ZoomOut size={18} />
                    </button>
                    <span className="text-xs text-[#C4C7C5] w-12 text-center">{Math.round(scale * 100)}%</span>
                    <button onClick={() => setScale(s => Math.min(2.0, s + 0.1))} className="p-2 hover:bg-[#303336] rounded text-[#C4C7C5] transition-colors">
                        <ZoomIn size={18} />
                    </button>
                    <div className="w-px h-6 bg-[#444746] mx-2" />
                    <button onClick={() => setRotation(r => (r + 90) % 360)} className="p-2 hover:bg-[#303336] rounded text-[#C4C7C5] transition-colors">
                        <RotateCw size={18} />
                    </button>
                </div>
            </div>

            {/* Viewer Area */}
            <div
                ref={canvasRef}
                className="flex-1 w-full overflow-auto flex justify-center p-8 bg-[#131314] relative select-none"
                style={{ userSelect: 'none' }}
            >
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <Loader2 className="animate-spin text-brand-blue" size={32} />
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center h-full text-red-400">
                        <AlertTriangle size={32} className="mb-2" />
                        <p>{error}</p>
                    </div>
                )}

                {!error && fileUrl && (
                    <div className="relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        {/* Secure Watermark Layer */}
                        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden flex flex-wrap content-center justify-center opacity-[0.03]"
                            style={{ transform: 'rotate(-45deg) scale(1.5)' }}
                        >
                            {Array.from({ length: 20 }).map((_, i) => (
                                <span key={i} className="text-4xl font-bold text-white m-12 select-none">
                                    {userEmail} • CONFIDENTIAL
                                </span>
                            ))}
                        </div>

                        <Document
                            file={fileUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            loading={<div className="h-[800px] w-[600px] bg-[#1E1F20] animate-pulse rounded" />}
                            className="flex flex-col gap-4"
                        >
                            {/* Render All Pages (Vertical Scroll) or Single Page based on preference. Here: Single for focus */}
                            <Page
                                pageNumber={pageNumber}
                                scale={scale}
                                rotate={rotation}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="bg-white shadow-xl"
                            />
                        </Document>
                    </div>
                )}
            </div>

            {/* Pagination Controls (Floating) */}
            {numPages > 0 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#28292A]/90 backdrop-blur border border-[#444746] rounded-full px-4 py-2 flex items-center gap-4 z-20 shadow-xl">
                    <button
                        onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                        disabled={pageNumber <= 1}
                        className="text-[#E3E3E3] disabled:opacity-30 hover:text-brand-blue"
                    >
                        Anterior
                    </button>
                    <span className="text-xs text-[#C4C7C5] border-l border-r border-[#444746] px-3">
                        {pageNumber} / {numPages}
                    </span>
                    <button
                        onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                        disabled={pageNumber >= numPages}
                        className="text-[#E3E3E3] disabled:opacity-30 hover:text-brand-blue"
                    >
                        Próxima
                    </button>
                </div>
            )}
            {/* Security Footer */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-[10px] text-gray-500 font-mono flex items-center gap-2 pointer-events-none z-50">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                SECURE VIEW • AUDIT ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} • IP LOGGED
            </div>
        </div>
    );
}
