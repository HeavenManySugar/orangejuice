import NextAuth from "next-auth"
import GiteaProvider from "./providers/gitea"
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
        async jwt({ token, account }) {
          if (account) {
            token.accessToken = account.access_token;
          }
          return token;
        },
        async session({ session, token }) {
          session.accessToken = token.accessToken as string;
          return session;
        },
      },    
})

export { handler as GET, handler as POST }