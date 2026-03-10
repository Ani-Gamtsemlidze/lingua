import { sql } from "@/lib/db";
import next from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined;
      name: string;
      email: string;
    };
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user =
          await sql`SELECT id, email, password FROM users WHERE email = ${credentials.email}`;
          if (!user[0]) return null;
          const isValid = await bcrypt.compare(
            credentials.password,
            user[0].password,
          );
          const { password, ...safeUser } = user[0]

        if (!isValid) return null;

        if (isValid) {
          return {
            id: safeUser.id,
            name: safeUser.email.split("@")[0],
            email: safeUser.email,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
