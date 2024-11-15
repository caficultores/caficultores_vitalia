import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { cookies } from "next/headers";

declare module "next-auth" {
    interface User {
        idToken?: string;
        role?: string;
    }
    interface Session {
        idToken?: string | undefined;
        role?: string;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope: "openid profile email",
          session: {
            strategy: "jwt",
          },
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.idToken = account.id_token;
      }

      if (account && user) {
        const cookieStore = await cookies();
        const role = cookieStore.get('role')?.value || "USER";
        const roleDb = await db.role.findFirst({ where: { name: role } });
        if (user.email && user.id && roleDb?.id) {
          const userRole = await db.usersHasRoles.findUnique({ where: { users_id_roles_id: { users_id: user.id, roles_id: roleDb.id } }, include: { role: true } });
          if (!userRole) {
            await db.usersHasRoles.create({
              data: { users_id: user.id, roles_id: roleDb.id },
            });
            token.role = role;
          } else {
            token.role = userRole?.role.name;
          }
        }
        cookieStore.delete("role");
      }

      return token;
    },
    async session({ session, token }) {
      session.idToken = token.idToken as string;
      session.role = token.role as string;
      return session;
    },
  },
  trustHost: true,
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
});
