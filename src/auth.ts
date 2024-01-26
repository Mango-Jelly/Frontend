import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {NextResponse} from "next/server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
          }),
        })

        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.Authorization = token.Authorization
      session.RefreshToken = token.refreshToken
      return session;
    }
  }
});