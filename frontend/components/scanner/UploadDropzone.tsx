"use client";

import React, { useState, useCallback } from 'react';
import { UploadCloud, FileJson, FileSpreadsheet, AlertCircle, Loader2 } from 'lucide-react';

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export default function UploadDropzone({ onFileSelect, isLoading }: UploadDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.name.endsWith('.json') || file.name.endsWith('.csv')) {
        setSelectedFileName(file.name);
        onFileSelect(file);
    } else {
        alert("Apenas arquivos .json ou .csv são permitidos.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className={`relative group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden
          ${dragActive ? 'border-[#00FF94] bg-[#0A1A2F]/80' : 'border-gray-600 bg-[#0A1A2F]/40 hover:border-[#00FF94]/50 hover:bg-[#0A1A2F]/60'}
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          onChange={handleChange}
          accept=".json,.csv"
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4 relative z-0">
            {isLoading ? (
                <>
                    <Loader2 className="w-12 h-12 text-[#00FF94] animate-spin mb-4" />
                    <p className="text-lg font-medium text-gray-300">Analisando Arquivo...</p>
                    <p className="text-sm text-gray-500 mt-2">Nossa IA está buscando violações da LGPD e OWASP.</p>
                </>
            ) : selectedFileName ? (
                <>
                    {selectedFileName.endsWith('.csv') ? 
                        <FileSpreadsheet className="w-12 h-12 text-[#00FF94] mb-4" /> : 
                        <FileJson className="w-12 h-12 text-[#00FF94] mb-4" />
                    }
                    <p className="text-xl font-bold text-white mb-2">{selectedFileName}</p>
                    <p className="text-sm text-[#00FF94]">Arquivo pronto para processamento</p>
                </>
            ) : (
                <>
                    <div className="p-4 rounded-full bg-[#0A1A2F] border border-gray-700 mb-4 group-hover:border-[#00FF94] transition-colors">
                        <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-[#00FF94] transition-colors" />
                    </div>
                    <p className="mb-2 text-lg text-gray-300">
                        <span className="font-semibold text-white">Clique para upload</span> ou arraste o arquivo aqui
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                        Suporta JSON (Logs) ou CSV
                    </p>
                </>
            )}
        </div>
        
        {!isLoading && !selectedFileName && (
            <div className="absolute bottom-4 flex items-center gap-2 text-xs text-gray-600 bg-[#0A1A2F] px-3 py-1 rounded-full border border-gray-800">
                <AlertCircle className="w-3 h-3" />
                <span>Seus dados são processados em RAM e deletados após o scan.</span>
            </div>
        )}
      </div>
    </div>
  );
}
