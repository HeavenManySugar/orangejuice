import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth"
import 'dotenv/config'

export type GiteaProfile = {
  sub: string
  name: string
  preferred_username: string
  email: string
  picture: string
  groups: string[]
}


export default function Gitea<P extends GiteaProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: 'gitea',
    name: 'Gitea',
    type: 'oauth',
    wellKnown: process.env.GITEA_URL + '/.well-known/openid-configuration',
    userinfo: {
      async request({ client, tokens }) {
        if (!tokens.access_token) {
          throw new Error("Access token is undefined");
        }
        const profile = await client.userinfo(tokens.access_token);
        return profile;
      },
    },
    profile: (profile) => {
      console.log('profile', profile)
      return {
        id: profile.sub,
        name: profile.preferred_username,
        email: profile.email,
        image: profile.picture,
      }
    },
    options,
  }
}