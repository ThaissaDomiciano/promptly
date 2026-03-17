"use client";

import { AlignLeft, Calendar, Check, Copy, Info, User, X } from "lucide-react";
import { useState } from "react";

interface ModalDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        title: string;
        content: string;
        description: string;
        category: string;
        created_at: string | Date;
        username: string;
    }
}

export default function ModalDetails({ isOpen, onClose, data }: ModalDetailsProps) {
    if (!isOpen) return null;

    const [copied, setCopied] = useState(false);

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(data.created_at));

    const handleCopy = async () => {

        try {
            await navigator.clipboard.writeText(data.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Erro ao copiar o texto: ", err);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl shadow-cyan-500/10"
                onClick={(e) => e.stopPropagation()}
            >

                <button onClick={onClose}
                    className="absolute right-6 top-6 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                        {data.category}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-white leading-tight">
                        {data.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-3">
                    <div className="h-5 w-5 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center">
                        <User className="h-3 w-3 text-slate-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-400">
                        Postado por <span className="text-cyan-400/90">{data.username}</span>
                    </span>
                </div>
                </div>

                <div className="space-y-6">
                    {data.description && (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                <Info className="h-3.5 w-3.5 text-cyan-500/70" />
                                <span>Sobre este prompt</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {data.description}
                            </p>
                        </div>
                    )}

                <div className="space-y-6">
                    <div className="rounded-2xl bg-black/40 p-6 border border-white/5">
                        <div className="flex items-center gap-2 mb-3 text-cyan-400/80 text-sm font-medium">
                            <AlignLeft className="h-4 w-4" />
                            <span>Prompt Completo</span>
                        </div>

                        <button
                            onClick={handleCopy}
                            className={`p-2 rounded-full transition-all border ${copied
                                    ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                                    : "text-slate-400 border-white/5 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 cursor-pointer"
                                }`}
                            title="Copiar prompt"
                        >
                            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>

                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {data.content}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/5 text-slate-500 text-[11px] font-medium uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Postado em {formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}