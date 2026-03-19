import { createPromptAction, updatePromptAction } from "@/app/actions";
import { Globe, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";

interface CreatePromptModalProps {
    isEditing?: boolean;
    initialData?: any;
}

export function CreatePromptModal({ isEditing, initialData }: CreatePromptModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isEditing ? (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded-full hover:bg-cyan-500/10 transition-all text-sm font-bold cursor-pointer"
            >
                <PlusCircle className="h-4 w-4" /> Novo Prompt
            </button>

            ) : (
            <button onClick={() => setIsOpen(true)} className="p-2 text-slate-500 hover:text-cyan-400 bg-white/5 rounded-full border border-white/5 cursor-pointer">
                <Pencil className="h-4 w-4" />
            </button>

            )}

            {isOpen && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4">
                    
                    <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative">

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-slate-600 hover:text-white cursor-pointer"
                        >
                            <X />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-6">
                            {isEditing ? "Editar Publicação" : "Nova Publicação"}
                        </h2>

                        <form
                            action={async (fd) => {
                                if(isEditing) {
                                    await updatePromptAction(initialData.prompt_id, fd);    
                                } else {  
                                    await createPromptAction(fd);
                                }
                                setIsOpen(false);
                            }}
                            className="space-y-4"
                        >

                            <input
                                name="title"
                                defaultValue={initialData?.title}
                                placeholder="Título do Prompt"
                                required
                                className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-white focus:border-cyan-500/50 outline-none"
                            />

                            <select
                                name="category"
                                defaultValue={initialData?.category}
                                className="cursor-pointer w-full bg-black/40 border border-white/5 rounded-xl p-3 text-white outline-none"
                            >
                                <option>Imagem</option>
                                <option>Vídeo</option>
                                <option>Código</option>
                                <option>Escrita</option>
                            </select>

                            <textarea
                                name="description"
                                defaultValue={initialData?.description}
                                placeholder="Descreva o seu prompt"
                                rows={2}
                                required
                                className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-white focus:border-cyan-500/50 outline-none resize-none"
                            />

                            <textarea
                                name="content_prompt"
                                defaultValue={initialData?.content_prompt}
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
                                    className="w-5 h-5 accent-cyan-500 cursor-pointer"
                                />
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer w-full bg-cyan-500 hover:bg-cyan-600 text-black font-extrabold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                            >
                                {isEditing ? "Salvar Alterações" : "Publicar Agora"}
                            </button>

                        </form>
                    </div>

                </div>
            )}
        </>
    );
}