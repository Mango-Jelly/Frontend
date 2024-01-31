import NextAuth from 'next-auth/next'
import { DefaultSession } from 'next-auth'

declare module "next-auth" {
  interface Session {
    session?: {
      accessToken: string;
      refreshToken: string;
    };
  }
  interface User {
    user?: {
      accessToken: string;
      refreshToken: string;
    };
  }
}