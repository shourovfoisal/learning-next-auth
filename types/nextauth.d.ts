import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name: string,
            age: number,
            address: string,
            accessToken: string,
            password: string
        }
    }
}