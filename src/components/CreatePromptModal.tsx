import { createPromptAction } from "@/app/actions";
import { Globe, PlusCircle, X } from "lucide-react";
import { useState } from "react";

export function CreatePromptModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded-full hover:bg-cyan-500/10 transition-all text-sm font-bold"
            >
                <PlusCircle className="h-4 w-4" /> Novo Prompt
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4">
                    
                    <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative">

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-slate-600 hover:text-white"
                        >
                            <X />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-6">
                            Nova Publicação
                        </h2>

                        <form
                            action={async (fd) => {
                                await createPromptAction(fd);
                                setIsOpen(false);
                            }}
                            className="space-y-4"
                        >

                            <input
                                name="title"
                                placeholder="Título do Prompt"
                                required
                                className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-white focus:border-cyan-500/50 outline-none"
                            />

                            <select
                                name="category"
                                className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-white outline-none"
                            >
                                <option>Imagem</option>
                                <option>Código</option>
                                <option>Escrita</option>
                            </select>

                            <textarea
                                name="description"
                                placeholder="Descreva o seu prompt"
                                rows={2}
                                required
                                className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-white focus:border-cyan-500/50 outline-none resize-none"
                            />

                            <textarea
                                name="content_prompt"
                                placeholder="Cole aqui o comando"
                                rows={4}
                                required
                                className="w-full bg-black/20 border border-cyan-500/20 rounded-xl p-4 text-cyan-100 font-mono text-sm outline-none resize-none"
                            />

                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                    <Globe className="h-4 w-4 text-cyan-400" />
                                    Público
                                </div>

                                <input
                                    type="checkbox"
                                    name="is_public"
                                    defaultChecked
                                    className="w-5 h-5 accent-cyan-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-extrabold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                            >
                                Publicar Agora
                            </button>

                        </form>
                    </div>

                </div>
            )}
        </>
    );
}