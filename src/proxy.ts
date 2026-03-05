import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define as rotas que NÃO precisam de login
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // Agora aguardamos o auth() e chamamos o protect()
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Pula arquivos internos e estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executa para APIs
    '/(api|trpc)(.*)',
  ],
};