import NextAuth, { User } from "next-auth"
import GiteaProvider from "./providers/gitea"
import { AdapterUser } from "next-auth/adapters";

import 'dotenv/config'

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    user?: {
      id?: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
  };
  }
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
  try {
    const url =
      process.env.GITEA_URL + '/login/oauth/access_token'

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GITEA_CLIENT_ID as string,
        client_secret: process.env.GITEA_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
      method: "POST",
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
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
          
          if (Date.now() >= (token.accessTokenExpires as number)) {
            return refreshAccessToken(token);
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