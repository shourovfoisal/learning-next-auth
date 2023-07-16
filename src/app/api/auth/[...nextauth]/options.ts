import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: "My Credentials Provider",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Input your username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Input your password"
                }
            },
            async authorize(credentials) {
                // here we have to make api calls
                // to retrieve user data.
                // the following is dummy data.
                const user = { id: "42", name: "Shourov", password: "nextauth" };

                if( credentials?.username === user.name && credentials?.password === user.password ) {
                    return user
                } else {
                    return null
                }
            }
        })
    ]
    
}