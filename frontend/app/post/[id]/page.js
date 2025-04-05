"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostById } from "../../api/post";
import Navbar from "../../components/Navbar";

export default function PostDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            const res = await getPostById(id);
            setPost(res.data);
        }
        fetchPost();
    }, [id]);

    if (!post) {
        return <div className="text-center mt-20 text-gray-500">Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h1>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                        <img
                            src={post.author?.avatar || "/avatars/default.png"}
                            alt="avatar"
                            className="w-6 h-6 rounded-full"
                        />
                        <span>{post.author?.username || "Unknown"}</span>
                    </div>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>

                {post.cover_image_url && (
                    <img
                        src={post.cover_image_url}
                        alt="cover"
                        className="w-full h-64 object-cover rounded-xl mb-6"
                    />
                )}

                <article className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                    {post.content}
                </article>
            </div>
        </div>
    );
}
