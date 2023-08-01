## Learning NextAuth | Dave Gray 
__Youtube: Next-Auth Login Authentication Tutorial with Next.js App Directory__  
[https://www.youtube.com/watch?v=w2h54xz6Ndw](https://www.youtube.com/watch?v=w2h54xz6Ndw)

__Also mixed code taken from the youtube tutorial below (For using JWT tokens)__  
[How to Manage Backend JWT Access Tokens in Next Auth and Next.js 13](https://www.youtube.com/watch?v=fYObrr3jf0w&ab_channel=SakuraDev)

* Must use NEXTAUTH_SECRET env variable
* Put it inside a .env.local file in the same level as the package.json file
* Can use this command to generate NEXTAUTH_SECRET value: openssl rand -base64 32
* But we can use any value, it doesn't need to be a generated secret value, can be any string
* More details: [next-auth JWEDecryptionFailed](https://stackoverflow.com/a/76549310/4558910)
 ---
* To use JSON Server
* json-server --watch json_server/data.json --port 3001 --middlewares json_server/middleware.js  
 ---
* Two factor authorization can be implemented using two credential providers
* Follow the official doc: [Credentials - Multiple providers](https://next-auth.js.org/providers/credentials#multiple-providers)
* And also see the [SignIn Callback](https://next-auth.js.org/configuration/callbacks#sign-in-callback)
<br />
<hr />
<hr />

__Using redux store from the server side__

The current state of a redux store initiated inside the client environment is not accessible by a server component or function, like the authorize() function inside of the \[...nextauth\] function. In this project, the store is initiated inside of the root layout file, that begins with "use client". If tried using store.getState(), it will only show the initial state defined hardcoded in the slice.

References:-  
[How can I get redux state in a next 13 server component?](https://stackoverflow.com/a/76369709/4558910)
[Access redux store inside Next.js API route](https://stackoverflow.com/q/70544228/4558910)  

<hr />
<hr />

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
