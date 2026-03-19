import CardPrompt from "@/components/CardPrompt";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

export default async function Home(props: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category } = await props.searchParams;
    const { userId } = await auth();
    const sql = neon(process.env.DATABASE_URL!);

    if (userId) {
        const user = await currentUser();
        if (user) {
            const email = user.emailAddresses[0].emailAddress;
            const username = user.username || user.firstName || email.split("@")[0];
            await sql`
                INSERT INTO users (user_id, email, username, image_url)
                VALUES (${userId}, ${email}, ${username}, ${user.imageUrl})
                ON CONFLICT (user_id) DO UPDATE SET username = EXCLUDED.username;
            `;
        }
    }

    const prompts = await sql`
        SELECT p.*, u.username
        FROM prompts p
        INNER JOIN users u ON p.author_id = u.user_id
        WHERE (p.is_public = true ${userId ? sql`OR p.author_id = ${userId}` : sql``})
        ${category && category !== "Todos" ? sql`AND p.category = ${category}` : sql``}
        ORDER BY p.created_at DESC LIMIT 12;
    `;

    return (
        <main className="container mx-auto px-8 pt-32 pb-20">
            {!userId ? (
                <div className="space-y-24 text-center">
                    <h2 className="text-6xl font-black text-white">
                        Eleve sua engenharia <span className="text-cyan-400">de prompts.</span>
                    </h2>
                    <SignInButton mode="modal">
                        <Button size="lg" className="bg-cyan-500 rounded-full px-10">Começar agora</Button>
                    </SignInButton>
                </div>
            ) : (
                <div className="space-y-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-8">
                        <h2 className="text-4xl font-bold text-white">Seu feed</h2>
                        <CategoryFilter />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {prompts.map((p: any) => (
                            <CardPrompt 
                                key={p.prompt_id} 
                                {...p} 
                                prompt_id={p.prompt_id} 
                                author_id={p.author_id} 
                                currentUserId={userId} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}