import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"];

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
        access_token: string;
        id_token: string;
    }
}