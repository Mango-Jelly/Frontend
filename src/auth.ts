import NextAuth from "next-auth";
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
          const authResponse = await fetch(`${process.env.AUTH_URL}/api/v1/member/login`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
          })

          if (!authResponse.ok) {
            console.log('authResponse not ok');
            return null
          }

          
          const user = await authResponse.json();
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
        token.Authorization = user?.data.accessToken
        token.refreshToken = user?.data.refreshToken
        token.nickname = user?.data.nickName

      }
      return token;
    },
    async session({token, session} : any){
        session.Authorization = token.Authorization;
        session.refreshToken = token.refreshToken;
        session.user.name = token.nickname;

        return session;
    },
  },
});