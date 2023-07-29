"use client"
import './globals.css'
import { Inter } from 'next/font/google'

import Navbar from '@/components/Navbar'
import AuthProvider from '@/app/context/AuthProvider'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { useEffect } from 'react'
import { savePosts } from '@/redux/slices/postsSlice'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextAuth Tutorial',
  description: 'Learn NextAuth.js by Dave Gray',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
      async function getPosts () {
          const postRes = await fetch("http://localhost:3001/posts")
          await postRes.json().then((posts) => {
              console.log("Dispatching post save action.");
              store.dispatch(savePosts(posts));
          });
      }
      getPosts();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Provider store={store}>
              <Navbar />
              <main className="flex flex-col justify-center items-center gap-16 p-6 min-h-screen">
                {children}
              </main>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  )
}