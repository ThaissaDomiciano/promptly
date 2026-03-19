"use client";

import { Bookmark, Check, Copy, Lock, User } from "lucide-react";
import { useState } from "react";
import ModalDetails from "./ModalDetails";
import { toggleSaveAction } from "@/app/actions";

interface CardPromptProps {
    prompt_id: string;
    author_id: string;
    currentUserId?: string | null;
    title: string;
    content: string;
    category: string;
    description: string;
    created_at: string;
    username: string;
    is_public: boolean;
    is_saved?: boolean;
}

export default function CardPrompt({ prompt_id, author_id, currentUserId, title, content, category, created_at, username, is_public, description, is_saved }: CardPromptProps) {
    const [copied, setCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saved, setSaved] = useState(is_saved);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Erro ao copiar o texto: ", err);
        } 
    }

    const handleSave = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!currentUserId) return alert("Faça login para salvar prompts.");

        setSaved(!saved);
        await toggleSaveAction(prompt_id);
    }

    return (
        <>
        <div className="group relative rounded-3xl border border-white/5 bg-slate-800/60 p-6 backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    {category}
                </span>

                {!is_public && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                        <Lock className="w-2.5 h-2.5" />
                        Privado
                    </span>
                )}
                <button onClick={handleSave} 
                        className={`transition-all cursor-pointer ${saved ? "text-cyan-400" : "text-slate-500 hover:text-cyan-400"}`}>
                    <Bookmark className="h-4 w-4"  />
                </button>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-3">
                {title}
            </h3>

            <div className="flex items-center gap-1.5 mt-1.5 mb-3">
                <div className="h-4 w-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <User className="h-2.5 w-2.5 text-cyan-400" />
                </div>
                <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                    por {username}
                </span>
            </div>

            <div className="relative mt-4 rounded-2xl bg-slate-800/40 p-4 border border-white/5">
                <p className="text-sm leading-relaxed text-slate-300 italic line-clamp-3">
                    {content}
                </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <button onClick={handleCopy}
                        className={`p-2 rounded-full transition-all ${
                            copied 
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 cursor-pointer"
                        }`}
                        title="Copiar"
                        >
                    {copied ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                    
                </button>
                <button onClick={() => setIsModalOpen(true)} 
                        className="cursor-pointer text-xs font-bold text-slate-500 hover:text-white uppercase tracking-tighter transition-colors">
                    Ver Detalhes →
                </button>
            </div>
        </div>
        <ModalDetails 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            currentUserId={currentUserId}
            data={{ prompt_id, author_id, title, content,category, created_at, username, description, is_public}}
        />
        </>
    )
}