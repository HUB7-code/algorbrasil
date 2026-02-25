import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Protegendo todas as rotas de dashboard e labs
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/academy/lab(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
    // Se a rota for protegida e o usuário não estiver logado,
    // o clerkMiddleware enviará para a URL de sign-in definida nas envs
    if (isProtectedRoute(req)) {
        await auth.protect();
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Match todos os arquivos exceto estáticos e internals do Next
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Match sempre a API (para Clerk agir lá tb) e trpc
        '/(api|trpc)(.*)',
    ],
};
