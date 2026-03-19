"use server";

import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

export async function createPromptAction(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Não autorizado.")

    const sql = neon(process.env.DATABASE_URL!);    

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content_prompt") as string;
    const category = formData.get("category") as string;
    const is_public = formData.get("is_public") === "on";

    await sql`
     INSERT INTO prompts (author_id, title, description, content_prompt, category, is_public)
     VALUES (${userId}, ${title}, ${description}, ${content}, ${category}, ${is_public})
    `;

    revalidatePath("/");
}

export async function deletePromptAction(promptId: string) {
    const { userId } = await auth();
    if(!userId) throw new Error("Não autorizado");

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
        DELETE FROM prompts 
        WHERE prompt_id = ${promptId} AND author_id = ${userId}
    `;

    revalidatePath("/");
} 

export async function updatePromptAction(promptId: string, formData: FormData) {
   const { userId } = await auth(); 
   if(!userId) throw new Error("Não autorizado");

   const sql = neon(process.env.DATABASE_URL!);

   const title = formData.get("title") as string;
   const description = formData.get("description") as string;
   const content = formData.get("content_prompt") as string;
   const category = formData.get("category") as string;
   const is_public = formData.get("is_public") === "on";

   await sql`
        UPDATE prompts
        SET title = ${title},
            description = ${description},
            content_prompt = ${content},
            category = ${category},
            is_public = ${is_public}
        WHERE prompt_id = ${promptId} AND author_id = ${userId}
   `;

   revalidatePath("/");
}
