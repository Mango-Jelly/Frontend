import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from 'cookie';
import { cookies } from 'next/headers'


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
      name: 'mango-server',

      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
          }),
        })
        console.log('authResponse', authResponse);

        if (!authResponse.ok) {
          console.log('authResponse not ok');
          return null
        }

        const user = await authResponse.json()
        return user;
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, account }) {
    //   if (account) {
    //     token.accessToken = account.access_token
    //     token.refreshToken = account.refresh_token
    //   }
    //   return token
    // },
    // async session({ session, token }) {
    //   session.accessToken = token.accessToken
    //   session.refreshToken = token.refreshToken
    //   return session
    // },
    
  }
});