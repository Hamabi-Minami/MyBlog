"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {

        }
        fetchPost();
    }, [id]);

    if (!post) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-6">{new Date(post.created_at).toLocaleDateString()}</p>
            <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                {post.content}
            </div>
        </div>
    );
}
