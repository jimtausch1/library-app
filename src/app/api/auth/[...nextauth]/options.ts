// @ts-nocheck

import type { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const options: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
      issuer: process.env.AUTH0_ISSUER_BASE_URL
    })
  ],
  callbacks: {
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        user.name = token.sub;
        user.email = user.email?.split('@')[0];
      }
      return session;
    },
  }
}