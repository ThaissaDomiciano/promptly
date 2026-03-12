"use client";

import { Bookmark, Copy } from "lucide-react";

interface CardPromptProps {
    title: string;
    content: string;
    category: string;
}

export default function CardPrompt({ title, content, category }: CardPromptProps) {
    return (
        <div className="group relative rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    {category}
                </span>
                <button className="text-slate-500 hover:text-cyan-400 transition-colors">
                    <Bookmark className="h-4 w-4"  />
                </button>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-3">
                {title}
            </h3>

            <div className="relative mt-4 rounded-2xl bg-black/40 p-4 border border-white/5">
                <p className="text-sm leading-relaxed text-slate-300 italic line-clamp-3">
                    {content}
                </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all">
                    <Copy className="h-4 w-4" />
                </button>
                <button className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-tighter transition-colors">
                    Ver Detalhes →
                </button>
            </div>
        </div>
    )
}