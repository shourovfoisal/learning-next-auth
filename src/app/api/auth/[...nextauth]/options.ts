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
                const userRes = await fetch("http://localhost:3001/user")
                const user = await userRes.json();

                console.log("my store");
                console.log(JSON.stringify(store.getState().postData.posts));

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
                    return user
                } else {
                    console.log("login failure");
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
        }
    },
    pages: {
        signIn: "/signin"
    }
}