"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function PostsPage() {
    const { id } = useParams();
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function fetchPost() {

        }

        const mock = [
            {
                id: 1,
                title: "How I Built My First Blog with Next.js and FastAPI",
                content: "In this article, I’ll walk you through how I built a full-stack blog application using FastAPI for the backend and Next.js for the frontend...",
                created_at: "2025-04-04T10:00:00Z",
                author: {
                    username: "Evan Liu",
                    avatar: "/avatars/evan.jpg"
                },
                cover_image_url: "/covers/cover1.jpg"
            },
            {
                id: 2,
                title: "Understanding JavaScript Closures in 10 Minutes",
                content: "Closures are a powerful concept in JavaScript. Once you understand how they work, your ability to write better JS improves dramatically...",
                created_at: "2025-03-30T12:00:00Z",
                author: {
                    username: "Alice Zhang",
                    avatar: "/avatars/alice.jpg"
                },
                cover_image_url: "/covers/cover2.jpg"
            },
            {
                id: 3,
                title: "Designing a Scalable API with FastAPI and PostgreSQL",
                content: "When building APIs that need to scale, you need to be careful with structure, performance, and deployment. FastAPI and PostgreSQL work great together...",
                created_at: "2025-03-25T09:45:00Z",
                author: {
                    username: "Jason Guo",
                    avatar: "/avatars/jason.png"
                },
                cover_image_url: "/covers/cover3.jpg"
            },
            {
                id: 4,
                title: "Why Tailwind CSS Changed How I Write Frontend Code",
                content: "I used to avoid utility-first CSS frameworks, but Tailwind CSS changed the way I think about styling completely. Here’s why...",
                created_at: "2025-03-20T15:30:00Z",
                author: {
                    username: "Linda Wong",
                    avatar: "/avatars/linda.png"
                },
                cover_image_url: "/covers/cover4.jpg"
            },
            {
                id: 5,
                title: "JWT vs Session: What’s Best for Your Web App?",
                content: "JWTs are stateless and lightweight, but Sessions have their place too. Let’s compare the two auth strategies and see when to use each...",
                created_at: "2025-03-18T08:20:00Z",
                author: {
                    username: "Bob Chen",
                    avatar: "/avatars/bob.jpg"
                },
                cover_image_url: "/covers/cover5.jpg"
            }
        ]
        setPosts(mock);
        fetchPost();
    }, [id]);

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
