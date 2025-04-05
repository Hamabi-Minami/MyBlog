"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../components/Navbar";
import {getPosts} from '../api/post'
import Link from "next/link";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);

    async function fetchData() {
        try {
            const res = await getPosts();
            setPosts(res.data);
        } catch (error) {
            console.error("Failed to load posts", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (!posts) {
        return <div className="text-center mt-20 text-gray-500">Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="space-y-4">
                {posts.map((post) => (
                    <Link key={post.id} href={`/post/${post.id}`}>
                        <div className="flex bg-white rounded-xl shadow hover:shadow-md transition border border-gray-100 overflow-hidden">
                            <img
                                src={post.cover_image_url || "/covers/default.jpg"}
                                alt="Cover"
                                className="w-48 h-32 object-cover"
                            />
                            <div className="p-4 flex flex-col justify-between w-full">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{post.title}</h2>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={post.author?.avatar || "/avatars/default.png"}
                                            alt={post.author?.username}
                                            className="w-5 h-5 rounded-full"
                                        />
                                        <span>{post.author?.username}</span>
                                    </div>
                                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {posts.length === 0 && (
                <div className="mt-12 text-gray-500 text-center">
                    No posts yet. Be the first to write one!
                </div>
            )}
        </div>
    );
}
