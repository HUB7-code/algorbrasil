'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, CheckCircle, Briefcase, Building2, Users, ChevronDown } from 'lucide-react';
import { API_ENDPOINTS } from '@/lib/api-config';

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
    role: string;
    comments: string;
    company: string;
    company_size: string;
    name: string;
    email: string;
    phone: string;
}

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// ─── Step Config ─────────────────────────────────────────────────────────────
const ROLES = [
    { value: 'lideranca', label: 'Executivo / Liderança', icon: '🏆', subtitle: 'Diretores, C-Level, Sócios' },
    { value: 'especialista', label: 'Analista / Especialista', icon: '⚙️', subtitle: 'Desenvolvedores, Dados, Operações' },
    { value: 'estudante', label: 'Estudante / Entusiasta', icon: '📚', subtitle: 'Graduação, Pós, Curiosos' },
    { value: 'empreendedor', label: 'Empresário / Consultor', icon: '💼', subtitle: 'Profissionais Liberais, Agências' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
    const pct = Math.round(((step) / total) * 100);
    return (
        <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#4F7EFF] to-[#00FF94]"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            />
        </div>
    );
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer
                ${selected
                    ? 'border-[#4F7EFF] bg-[#4F7EFF]/15 text-white shadow-[0_0_20px_rgba(79,126,255,0.25)]'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white'
                }`}
        >
            {label}
            {selected && (
                <motion.div
                    layoutId="chip-sel"
                    className="absolute inset-0 rounded-xl border border-[#4F7EFF]"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
            )}
        </button>
    );
}

function GlowInput({ label, type = 'text', value, onChange, placeholder, autoFocus }: {
    label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; autoFocus?: boolean;
}) {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => { if (autoFocus && ref.current) ref.current.focus(); }, [autoFocus]);

    return (
        <div className="space-y-2">
            <label className="text-xs text-slate-400 font-bold uppercase tracking-widest">{label}</label>
            <div className="relative">
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-lg placeholder:text-slate-600 outline-none focus:border-[#4F7EFF] focus:bg-white/8 focus:shadow-[0_0_30px_rgba(79,126,255,0.15)] transition-all duration-300"
                />
            </div>
        </div>
    );
}

// ─── Steps ─────────────────────────────────────────────────────────────────────
const stepVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.2 } }),
};

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState<FormData>({
        role: '', comments: '', company: '', company_size: '', name: '', email: '', phone: '',
    });

    // Lock scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            // Reset on close after animation
            setTimeout(() => { setStep(0); setDir(1); setSubmitted(false); setError(''); setForm({ role: '', comments: '', company: '', company_size: '', name: '', email: '', phone: '' }); }, 400);
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Keyboard navigation
    const canAdvance = useCallback(() => {
        if (step === 0) return !!form.role;
        if (step === 1) return !!form.name && !!form.email && !!form.phone;
        return false;
    }, [step, form]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!isOpen || submitted) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'Enter' && canAdvance()) advance();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, canAdvance, step, submitted]);

    const advance = () => {
        if (step < 1) { setDir(1); setStep(s => s + 1); }
        else handleSubmit();
    };

    const back = () => { setDir(-1); setStep(s => s - 1); };

    const set = (field: keyof FormData) => (val: string) => setForm(f => ({ ...f, [field]: val }));

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const payload = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                company: form.company || 'N/A', // Fallback obrigatório API
                role: form.role,
                company_size: form.company_size || 'N/A', // Fallback obrigatório API
                comments: form.comments || `Interesse em trilha de formação - Perfil: ${form.role}`,
                source: 'training-journey-cta',
                urgency: 'planning',
            };
            const res = await fetch(API_ENDPOINTS.leads.createSpecialist, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const json = await res.json().catch(() => ({}));
                throw new Error(json?.detail || 'Erro ao enviar. Tente novamente.');
            }
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || 'Erro inesperado.');
        } finally {
            setLoading(false);
        }
    };

    const STEPS = [
        {
            label: 'Passo 1 de 2', title: 'Qual é o seu perfil no universo de IA?',
            subtitle: 'Nosso material atende desde quem está aprendendo até quem governa grandes projetos.',
            content: (
                <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ROLES.map(r => (
                            <button
                                key={r.value}
                                type="button"
                                onClick={() => {
                                    set('role')(r.value);
                                    // Avanço automático com pequeno delay
                                    setTimeout(() => advance(), 150);
                                }}
                                className={`flex flex-col gap-2 px-5 py-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer group hover:scale-[1.02]
                                    ${form.role === r.value
                                        ? 'border-[#4F7EFF] bg-[#4F7EFF]/15 shadow-[0_0_25px_rgba(79,126,255,0.25)]'
                                        : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{r.icon}</span>
                                    <span className={`text-base font-bold ${form.role === r.value ? 'text-white' : 'text-slate-200'}`}>{r.label}</span>
                                </div>
                                <span className={`text-xs pl-9 ${form.role === r.value ? 'text-[#4F7EFF]' : 'text-slate-500'}`}>{r.subtitle}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            label: 'Passo 2 de 2', title: 'Onde enviamos sua trilha?',
            subtitle: 'Prometemos zero spam. Apenas conteúdo relevante para o seu crescimento em IA.',
            content: (
                <div className="space-y-4">
                    <GlowInput label="Seu nome completo" value={form.name} onChange={set('name')} placeholder="Ex: Maria Silva" autoFocus />
                    <GlowInput label="Seu melhor Email corporativo (ou pessoal)" type="email" value={form.email} onChange={set('email')} placeholder="maria@email.com" />
                    <GlowInput label="WhatsApp" type="tel" value={form.phone} onChange={set('phone')} placeholder="(11) 99999-9999" />
                </div>
            ),
        },
    ];

    const currentStep = STEPS[step];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-[#060910]/92 backdrop-blur-xl"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Glow blobs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#4F7EFF] rounded-full blur-[200px] opacity-[0.08]" />
                        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00FF94] rounded-full blur-[180px] opacity-[0.05]" />
                    </div>

                    {/* Modal Card */}
                    <motion.div
                        className="relative z-10 w-full max-w-lg"
                        initial={{ scale: 0.92, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.94, opacity: 0, y: 10 }}
                        transition={{ type: 'spring', damping: 22, stiffness: 250 }}
                    >
                        <div
                            className="rounded-3xl overflow-hidden"
                            style={{
                                background: 'rgba(10, 15, 30, 0.9)',
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                                border: '1px solid rgba(79, 126, 255, 0.2)',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(79,126,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
                            }}
                        >
                            {/* Header */}
                            <div className="px-8 pt-8 pb-0">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#4F7EFF]/20 flex items-center justify-center">
                                            <Briefcase className="w-4 h-4 text-[#4F7EFF]" />
                                        </div>
                                        <span className="text-xs font-bold text-[#4F7EFF] uppercase tracking-widest">Trilha de Formação</span>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                {!submitted && <ProgressBar step={step + 1} total={2} />}
                            </div>

                            {/* Body */}
                            <div className="px-8 py-6 min-h-[420px] flex flex-col">
                                <AnimatePresence mode="wait" custom={dir}>
                                    {submitted ? (
                                        /* ── SUCCESS SCREEN ── */
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                            className="flex flex-col items-center justify-center text-center flex-1 py-6"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.1, type: 'spring', damping: 12, stiffness: 180 }}
                                                className="w-20 h-20 rounded-full bg-[#00FF94]/15 border border-[#00FF94]/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,255,148,0.2)]"
                                            >
                                                <CheckCircle className="w-10 h-10 text-[#00FF94]" />
                                            </motion.div>
                                            <h3 className="text-2xl font-extrabold text-white mb-3">Trilha Reservada! 🎉</h3>
                                            <p className="text-slate-400 mb-2 leading-relaxed max-w-sm">
                                                Perfeito, <span className="text-white font-semibold">{form.name.split(' ')[0]}</span>! Nossa equipe vai entrar em contato em até <strong className="text-[#00FF94]">5 dias úteis</strong> com sua trilha personalizada.
                                            </p>
                                            <p className="text-slate-500 text-sm">Fique de olho no WhatsApp <strong className="text-slate-300">{form.phone}</strong></p>

                                            <motion.button
                                                onClick={onClose}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="mt-8 px-8 py-3 border border-[#4F7EFF]/40 text-[#4F7EFF] rounded-xl font-bold text-sm hover:bg-[#4F7EFF]/10 transition-all"
                                            >
                                                Fechar
                                            </motion.button>
                                        </motion.div>
                                    ) : (
                                        /* ── FORM STEPS ── */
                                        <motion.div
                                            key={step}
                                            custom={dir}
                                            variants={stepVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="flex flex-col flex-1"
                                        >
                                            <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-2">{currentStep.label}</p>
                                            <h2 className="text-2xl font-extrabold text-white mb-1.5">{currentStep.title}</h2>
                                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{currentStep.subtitle}</p>

                                            <div className="flex-1">{currentStep.content}</div>

                                            {error && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mt-3 text-red-400 text-sm text-center"
                                                >
                                                    {error}
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer / Navigation */}
                            {!submitted && (
                                <div className="px-8 pb-8">
                                    <div className="flex gap-3">
                                        {step > 0 && (
                                            <button
                                                onClick={back}
                                                className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/25 transition-all text-sm font-semibold"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                Voltar
                                            </button>
                                        )}
                                        <motion.button
                                            onClick={advance}
                                            disabled={!canAdvance() || loading}
                                            whileHover={canAdvance() ? { scale: 1.02 } : {}}
                                            whileTap={canAdvance() ? { scale: 0.98 } : {}}
                                            className={`flex-1 relative overflow-hidden flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300
                                                ${canAdvance()
                                                    ? 'bg-[#4F7EFF] text-white hover:bg-[#3D6AE8] shadow-[0_0_25px_rgba(79,126,255,0.3)]'
                                                    : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                                                }`}
                                        >
                                            {loading ? (
                                                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                            ) : (
                                                <>
                                                    {step < 1 ? 'Continuar' : 'Receber Minha Trilha'}
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                            {canAdvance() && (
                                                <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                                            )}
                                        </motion.button>
                                    </div>

                                    {/* Keyboard hint */}
                                    {canAdvance() && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center mt-3 text-[11px] text-slate-600"
                                        >
                                            Pressione <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">Enter ↵</kbd> para continuar
                                        </motion.p>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
