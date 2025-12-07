import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"  // esto se debe instalar como: 'npm install @auth/prisma-adapter'
import authConfig from "@/auth.config"
import { db } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    ...authConfig,
    session: { strategy: "jwt" },

    callbacks: {
        // Se ejecuta cada vez que se crea/actualiza el token JWT
        jwt({ token, user }) {
            if (user) {
                // Guardamos el rol del usuario
                // @ts-ignore
                token.role = user.role;
                // Guardamos también el id del usuario
                // @ts-ignore
                token.id = user.id;
                // Guardamos el username del usuario
                // @ts-ignore
                token.username = user.username;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                // Pasamos el rol a la sesión
                // @ts-ignore
                session.user.role = token.role;
                // Pasamos también el id a la sesión
                // @ts-ignore
                session.user.id = token.id;
                // Pasamos el username a la sesión
                // @ts-ignore
                session.user.username = token.username;
            }
            return session;
        },
    },
});
