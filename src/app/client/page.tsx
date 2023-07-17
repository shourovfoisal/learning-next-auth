'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from '@/components/UserCard'
import { useEffect, useState } from 'react'

export default function ClientPage() {

    const [posts, setPosts] = useState<{ id: number, title: string }[]>([]);

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    useEffect(() => {
        async function getPosts() {
            const res = await fetch("http://localhost:3001/posts", {
                headers: {
                    authorization: `bearer ${session?.user?.accessToken}`
                }
            })
            setPosts(await res.json());
        }
        getPosts();
    }, []);

    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Client"} />
            {
                posts?.map(post => <p key={post.id}>{post.title}</p>)
            }
        </section>
    )
}