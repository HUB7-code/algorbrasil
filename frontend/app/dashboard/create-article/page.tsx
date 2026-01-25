"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Image as ImageIcon, Send, Eye, Save, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';

// ========================================
// CREATE ARTICLE PAGE - LinkedIn-style Editor
// ========================================

export default function CreateArticlePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Governança');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const categories = ['Governança', 'Compliance', 'Regulação', 'Tecnologia', 'Ética', 'Setorial'];

    // Dropzone for cover image
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setCoverImage(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        }
    });

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSaveDraft = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Por favor, preencha o título e o conteúdo do artigo.');
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch('/api/blog/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    tags,
                    coverImage,
                    author: {
                        name: 'Membro ALGOR', // TODO: Get from session
                        avatar: '/images/default-avatar.webp',
                        role: 'Associado'
                    }
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Artigo salvo com sucesso!');
                // Optionally clear form or redirect
            } else {
                alert(`Erro: ${data.error}`);
            }
        } catch (error) {
            console.error('Error saving article:', error);
            alert('Erro ao salvar artigo. Tente novamente.');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Por favor, preencha o título e o conteúdo do artigo.');
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch('/api/blog/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    tags,
                    coverImage,
                    author: {
                        name: 'Membro ALGOR', // TODO: Get from session
                        avatar: '/images/default-avatar.webp',
                        role: 'Associado'
                    }
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Artigo publicado com sucesso!');
                router.push(`/blog/${data.slug}`);
            } else {
                alert(`Erro: ${data.error}`);
            }
        } catch (error) {
            console.error('Error publishing article:', error);
            alert('Erro ao publicar artigo. Tente novamente.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050A10] text-white">
            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-[#0A1A2F]/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Voltar</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#00A3FF]/30 text-gray-400 hover:text-white transition-all"
                        >
                            <Eye className="w-4 h-4" />
                            <span className="text-sm font-medium">{isPreview ? 'Editar' : 'Visualizar'}</span>
                        </button>

                        <button
                            onClick={handleSaveDraft}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#00FF94]/30 text-gray-400 hover:text-white transition-all disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            <span className="text-sm font-medium">Salvar Rascunho</span>
                        </button>

                        <button
                            onClick={handlePublish}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#00FF94] text-black font-bold hover:bg-[#00FF94]/90 transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)] disabled:opacity-50"
                        >
                            <Send className="w-4 h-4" />
                            <span className="text-sm">Publicar</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="max-w-5xl mx-auto px-6 py-12">
                {!isPreview ? (
                    // EDITOR MODE
                    <div className="space-y-8">
                        {/* Cover Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-3">
                                Imagem de Capa (Opcional)
                            </label>

                            {coverImage ? (
                                <div className="relative group">
                                    <div className="relative h-80 rounded-2xl overflow-hidden">
                                        <Image
                                            src={coverImage}
                                            alt="Cover"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setCoverImage(null)}
                                        className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ) : (
                                <div
                                    {...getRootProps()}
                                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragActive
                                        ? 'border-[#00FF94] bg-[#00FF94]/5'
                                        : 'border-white/10 hover:border-[#00FF94]/30 bg-white/[0.02]'
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                                    <p className="text-gray-400 mb-2">
                                        {isDragActive ? 'Solte a imagem aqui...' : 'Arraste uma imagem ou clique para selecionar'}
                                    </p>
                                    <p className="text-gray-600 text-sm">PNG, JPG, WEBP até 5MB</p>
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título do artigo..."
                                className="w-full bg-transparent border-none text-5xl font-orbitron font-bold text-white placeholder:text-gray-700 focus:outline-none"
                            />
                        </div>

                        {/* Category & Tags */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-3">
                                    Categoria
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00FF94]/50 transition-colors"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat} className="bg-[#0A1A2F]">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-3">
                                    Tags
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        placeholder="Adicionar tag..."
                                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF94]/50 transition-colors"
                                    />
                                    <button
                                        onClick={handleAddTag}
                                        className="px-4 py-3 rounded-xl bg-[#00FF94]/10 border border-[#00FF94]/30 text-[#00FF94] hover:bg-[#00FF94]/20 transition-all"
                                    >
                                        +
                                    </button>
                                </div>
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-lg bg-[#00FF94]/10 border border-[#00FF94]/30 text-[#00FF94] text-sm flex items-center gap-2"
                                            >
                                                #{tag}
                                                <button
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="hover:text-red-400 transition-colors"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-3">
                                Conteúdo
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Escreva seu artigo aqui... Você pode usar Markdown para formatação."
                                rows={20}
                                className="w-full px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/10 text-white text-lg leading-relaxed placeholder:text-gray-600 focus:outline-none focus:border-[#00FF94]/50 transition-colors resize-none font-light"
                            />
                            <p className="text-gray-600 text-sm mt-2">
                                Dica: Use **negrito**, *itálico*, ## Títulos, - listas, e &gt; citações
                            </p>
                        </div>
                    </div>
                ) : (
                    // PREVIEW MODE
                    <div className="space-y-8">
                        {/* Cover Image Preview */}
                        {coverImage && (
                            <div className="relative h-96 rounded-2xl overflow-hidden">
                                <Image
                                    src={coverImage}
                                    alt="Cover"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* Category Badge */}
                        <div className="inline-block px-4 py-2 rounded-lg bg-[#00FF94]/10 border border-[#00FF94]/30 text-[#00FF94] text-xs font-bold uppercase tracking-wider">
                            {category}
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-orbitron font-bold leading-tight">
                            {title || 'Título do artigo'}
                        </h1>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Content Preview */}
                        <div className="prose-algor">
                            {content.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-6">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Floating Help */}
            <div className="fixed bottom-6 right-6 z-40">
                <button className="p-4 rounded-full bg-[#00FF94] text-black shadow-[0_0_30px_rgba(0,255,148,0.4)] hover:shadow-[0_0_40px_rgba(0,255,148,0.6)] transition-all">
                    <Sparkles className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
