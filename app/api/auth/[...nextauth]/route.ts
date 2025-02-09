import NextAuth, { User } from "next-auth"
import GiteaProvider from "./providers/gitea"
import { AdapterUser } from "next-auth/adapters";

import 'dotenv/config'

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const handler = NextAuth({
    providers: [
        GiteaProvider({
            clientId: process.env.GITEA_CLIENT_ID as string,
            clientSecret: process.env.GITEA_CLIENT_SECRET as string,
            issuer: process.env.GITEA_ISSUER,
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
          if (account && user) {
            return {
              accessToken: account.access_token,
              accessTokenExpires: account.expires_at,
              refreshToken: account.refresh_token,
              user,
            }
          }
          
          if (Date.now() < (token.accessTokenExpires as number)) {
            return token;
          }
          return token;
        },
        async session({ session, token }) {
          if (token) {
            session.user = token.user as User | AdapterUser;
            session.accessToken = token.accessToken as string;
          }
          return session;
        },
      },    
})

export { handler as GET, handler as POST }