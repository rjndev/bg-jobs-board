import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authUser } from "@/server/services/auth/authService";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "sample@mail.com" },
        password: { label: "Password", type: "password", placeholder: "••••••••" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        try {
          const result: any = await authUser(credentials?.email, credentials?.password);
          if (!result?.user) return null;
          return {
            id: String(result.user.id),
            name: result.user.name,
            email: result.user.email,
          } as any;
        } catch (err) {
          console.log("Authorize error", err);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/login'
  }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};