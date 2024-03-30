import type {NextAuthConfig} from "next-auth"
import NextAuth from "next-auth"
import authConfig from "@/auth.config";

const config = {
    debug: true,
    session: {strategy: "jwt"},
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token = Object.assign({}, token, { access_token: account.access_token,id_token:account.id_token });
            }
            return token
        },
        async session({session, token}) {
            if(session) {
                session = Object.assign({}, session, {access_token: token.access_token,id_token:token.id_token})
                console.log(session);
            }
            return session
        }
    },
    ...authConfig
} satisfies NextAuthConfig

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth(config);