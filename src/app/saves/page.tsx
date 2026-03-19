import CardPrompt from "@/components/CardPrompt";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

export default async function savedPage() {
    const { userId } = await auth();
    if(!userId) return <div className="pt-40 text-center text-white">Faça login para ver seus itens salvos.</div>
    
    const sql = neon(process.env.DATABASE_URL!);

    const savedPrompts = await sql`
        SELECT p.*, u.username,  true as is_saved
        FROM prompts p
        INNER JOIN saved_prompts s ON p.prompt_id = s.prompt_id
        INNER JOIN users u ON p.author_id = u.user_id
        WHERE s.user_id = ${userId}
        ORDER BY s.saved_at DESC; 
    `;

    return (
        <main className="container mx-auto px-8 pt-32 pb-20">
            <h2 className="text-4xl font-bold text-white mb-10 tracking-tight">Meus Salvos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPrompts.map((p:any) => (
                    <CardPrompt key={p.prompt_id} {...p} currentUserId={userId} />
                ))}
            </div>

            {savedPrompts.length === 0 && (
                <div className="text-slate-500 mt-10">Sua coleção está vazia. Comece a explorar.</div>
            )}
        </main>
    )

}