import CardPrompt from "@/components/CardPrompt";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

export default async function Home() {
    const { userId } = await auth();
    const sql = neon(process.env.DATABASE_URL!);

    if (userId) {
        const user = await currentUser();
        if (user) {
            const email = user.emailAddresses[0].emailAddress;
            const username = user.username || user.firstName || email.split("@")[0];
            const imageUrl = user.imageUrl;

            await sql`
                INSERT INTO users (user_id, email, username, image_url)
                VALUES (${userId}, ${email}, ${username}, ${imageUrl})
                ON CONFLICT (user_id) DO UPDATE
                SET image_url = EXCLUDED.image_url, username = EXCLUDED.username
            `;
        }
    }

    const prompts = await sql`
   SELECT 
        p.*, 
        u.username
    FROM prompts p
    INNER JOIN users u ON p.author_id = u.user_id
    WHERE p.is_public = true 
    ${userId ? sql`OR p.author_id = ${userId}` : sql``}
    ORDER BY p.created_at DESC
    LIMIT 12;
    `;

    return (
        <main className="container mx-auto px-8 pt-32 pb-20">
            {!userId ? (
                // visão sem login
                <div className="space-y-24 text-center">
                    <section className="space-y-8">
                        <h2 className="text-6xl font-black text-white leading-tight tracking-tighter">
                            Eleve sua engenharia <br />
                            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">de prompts.</span>
                        </h2>
                        <SignInButton mode="modal">
                            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-full px-10 h-14">
                                Começar agora
                            </Button>
                        </SignInButton>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 grayscale pointer-events-none">
                        <CardPrompt
                            prompt_id=""
                            author_id=""
                            title="Preview 1"
                            category="IA"
                            username="Comunidade"
                            created_at={new Date().toISOString()}
                            content="Faça login para ver os prompts reais compartilhados na comunidade"
                            description="Uma breve descrição do que este prompt faz."
                            is_public={true}
                        />
                       <CardPrompt
                            prompt_id=""
                            author_id=""
                            title="Preview 1"
                            category="IA"
                            username="Comunidade"
                            created_at={new Date().toISOString()}
                            content="Faça login para ver os prompts reais compartilhados na comunidade"
                            description="Uma breve descrição do que este prompt faz."
                            is_public={true}
                        />
                        <CardPrompt
                            prompt_id=""
                            author_id=""
                            title="Preview 1"
                            category="IA"
                            username="Comunidade"
                            created_at={new Date().toISOString()}
                            content="Faça login para ver os prompts reais compartilhados na comunidade"
                            description="Uma breve descrição do que este prompt faz."
                            is_public={true}
                        />
                    </div>
                </div>
            ) : (
                // visão logado
                <div className="space-y-10">
                    <h2 className="text-4xl font-bold text-white tracking-tight">Seu feed</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {prompts.map((p: any) => (
                            <CardPrompt
                                key={p.prompt_id}
                                prompt_id={p.prompt_id}
                                author_id={p.author_id}
                                currentUserId={userId}
                                title={p.title}
                                category={p.category}
                                content={p.content_prompt}
                                description={p.description}
                                created_at={p.created_at}
                                username={p.username}
                                is_public={p.is_public}
                            />
                        ))}
                    </div>
                </div>
            )}
        </main>
    )
}