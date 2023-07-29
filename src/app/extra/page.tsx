"use client"
import {useSelector} from "react-redux"

export default function ExtraPage() {
    const posts = useSelector((state: any) => state.postData.posts);

    return (
        <>
            <h1 className="text-5xl block">Extra Page!</h1>
            <div>{JSON.stringify(posts)}</div>
        </>
    )
}