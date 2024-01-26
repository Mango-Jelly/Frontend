import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

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
        if (!credentials?.email || !credentials?.password) return null;

        const authResponse = await fetch(`${process.env.AUTH_URL}/member/login`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        console.log('authResponse', authResponse);

        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()

        console.log('user', user);
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