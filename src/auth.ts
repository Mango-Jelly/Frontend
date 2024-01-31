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
  
          console.log('user 데이터', user);
           return user;
        } catch (e) {
          console.log('error', e);
        }

        },
    }),
  ],
  // callbacks: {
  //   async jwt({token, user} ){
  //     if(user) {
  //         token.accessToken = user?.accessToken
  //         token.refreshToken = user?.refreshToken
  //     }
  //     return token;
  //     },
  //     async session({ session, token }){
  //         session.accessToken = token.accessToken
  //         session.refreshToken = token.refreshToken
          
  //         return session;
  //     },
  // },
});