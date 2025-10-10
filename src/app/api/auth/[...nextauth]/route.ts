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
        console.log("Credentials:", credentials)

        const result : any = await authUser(credentials?.email, credentials?.password)
        
        console.log("Auth result ", result)

        if (result.error)  return null;

        const user = { id: "1", name: "John Doe", email: credentials?.email };
        return user;
      }
    }),
  ],
  pages: {
    signIn: '/login'
  }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};