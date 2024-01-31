import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
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
      name: 'mango-server',

      async authorize(credentials) {
        try{
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
          console.log('authResponse는 다음과 같음', authResponse);
  
          if (!authResponse.ok) {
            console.log('authResponse not ok');
            return null
          }
  
          const user = await authResponse.json()
          return user;

        } catch (e) {
          console.log('error', e);
        }

        },
    }),
  ],
  callbacks: {
    async jwt({user, token} : any){
      if(user) {
        console.log('token' + token)

        token.Authorization = user?.data.accessToken
        token.refreshToken = user.data.refreshToken
      }
      return token;
    },
    async session({token, session} : any){
        session.Authorization = token.Authorization
        session.RefreshToken = token.refreshToken

        return session;
    },
  },
});