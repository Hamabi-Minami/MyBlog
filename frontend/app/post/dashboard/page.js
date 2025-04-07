"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogLayout from "@/app/components/Layout";
import {getMyPosts} from "../../api/post";
import Link from "next/link";
import {formatDateLocal} from "@/app/utils/tools";

export default function DashboardPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            router.push("/login");
            return;
        }

        getMyPosts(token)
            .then((res) => setPosts(res.data))
            .catch((err) => console.error("Failed to fetch user posts", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <BlogLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">My Posts</h1>
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : posts.length === 0 ? (
                    <p className="text-gray-500">You haven't published any posts yet.</p>
                ) : (
                    posts.map((post) => (

                        <Link
                            key={post.id}
                            href={`/post/${post.id}`}
                            className="block bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h2>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>✍️ {post.author?.username}</span>
                                <span>{formatDateLocal(post.created_at)}</span>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </BlogLayout>
    );
}
