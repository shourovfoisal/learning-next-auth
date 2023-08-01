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
                const userRes = await fetch("http://localhost:3001/user")
                const user = await userRes.json();

                // const postRes = await fetch("http://localhost:3001/posts")
                // await postRes.json().then((posts) => {
                //     console.log("Dispatching post save action.");
                //     store.dispatch(savePosts(posts));
                // });


                // console.log("fetchdata");
                // console.log(JSON.stringify(user));
                // console.log("credentials");
                // console.log(JSON.stringify(credentials));

                // console.log(`credential.u = ${credentials?.username} fetch.u = ${user?.username}`);
                // console.log(`username match: ${credentials?.username === user?.username}`);
                // console.log(`password match: ${credentials?.password === user?.password}`);

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

                const dummyUserSuccessData = {
                    id: "1",
                    name:"shourov",
                    age: 29,
                    address: "mirpur, dhaka",
                    accessToken: "sampleJwtToken",
                    password: "123",
                    status: "LOGGED_IN"
                }

                const twoFactorRes = await fetch("http://localhost:3001/twoFactor")
                const twoFactor = await twoFactorRes.json();

                if( 
                    credentials?.username === twoFactor?.user && 
                    credentials?.verificationCode === twoFactor?.value 
                ) {
                    console.log("two factor success");
                    return dummyUserSuccessData
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
        async signIn({user, account, profile, email, credentials}: any){
            if(user.status === 'OTP_REQUIRED') {
                return `/twofactor?name=${user.name}`
            } else {
                return true
            }
        }
    },
    pages: {
        signIn: "/signin"
    }
}