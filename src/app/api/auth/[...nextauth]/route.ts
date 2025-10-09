import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

        if (!credentials) return null;
        const user = { id: "1", name: "John Doe", email: "sample@mail.com" };
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