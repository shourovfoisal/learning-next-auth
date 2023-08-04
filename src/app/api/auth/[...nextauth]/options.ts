import type { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { store } from "@/redux/store";
// import { savePosts } from "@/redux/slices/postsSlice";

export const options: NextAuthOptions = {
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string
        // }),
        CredentialsProvider({
            id: "userpass",
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
            async authorize(credentials, request) {
                const userRes = await fetch("http://localhost:3001/user/1")
                const user = await userRes.json();

                if( credentials?.username === user?.name && credentials?.password === user?.password ) {
                    console.log("login success");
                    return user;
                } else {
                    console.log("login failure");
                    return null
                }
            },
        }),
        CredentialsProvider({
            id: "twofactor",
            name: "Two Factor",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Input your username"
                },
                verificationCode: {
                    label: "Verification Code:",
                    type: "text",
                    placeholder: "Input your verification code"
                }
            },
            async authorize(credentials) {

                /**
                 * here I am not fetching the second user
                 * simply because I don't know how to change
                 */
                const userRes = await fetch("http://localhost:3001/user/1")
                const user = await userRes.json();

                const twoFactorRes = await fetch("http://localhost:3001/twoFactor")
                const twoFactor = await twoFactorRes.json();

                if( 
                    credentials?.username === twoFactor?.user && 
                    credentials?.verificationCode === twoFactor?.value 
                ) {
                    console.log("two factor success");
                    // here I am manually changing this status
                    // but in actual scenerio, the server will handle it
                    user.status = "SIGNED_IN";  
                    return user
                } else {
                    console.log("two factor failure");
                    return null
                }
            },
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            // console.log("Token:");
            // console.log(token);
            // console.log("User:");
            // console.log(user);
            
            return {...token, ...user};
        },
        async session({ session, token, user }) {
            // console.log("Session:");
            // console.log(token);
            // console.log("Token:");
            // console.log(token);
            // console.log("User:");
            // console.log(user);

            session.user = token as any;
            return session;
        },
        // async signIn({user, account, profile, email, credentials}: any){
        //     if(user.status === 'OTP_REQUIRED') {
        //         return `/twofactor?name=${user.name}`
        //     } else {
        //         return true
        //     }
        // }
    },
    pages: {
        signIn: "/signin"
    }
}