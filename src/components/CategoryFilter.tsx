"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = ["Todos", "Imagem", "Vídeo", "Código", "Escrita"];

export function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category") || "Todos";

    const handleFilter = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "Todos") {
            params.delete("category");
            router.push("/");
        } else {
            params.set("category", category);
            router.push(`?${params.toString()}`);
        }
    }

    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleFilter(cat)}
                    className={`px-5 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                        currentCategory === cat
                            ? "bg-cyan-500 border-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                            : "border-white/10 text-slate-400 hover:border-cyan-500/30 hover:text-white bg-white/5"
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}