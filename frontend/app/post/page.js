"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getPosts } from "../api/post";
import Link from "next/link";
import {formatDateLocal} from "@/app/utils/tools";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");
    const [sortAsc, setSortAsc] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getPosts();
                let filtered = res.data;

                if (searchTitle) {
                    filtered = filtered.filter((p) =>
                        p.title.toLowerCase().includes(searchTitle.toLowerCase())
                    );
                }

                if (searchAuthor) {
                    filtered = filtered.filter((p) =>
                        p.author?.username.toLowerCase().includes(searchAuthor.toLowerCase())
                    );
                }

                filtered.sort((a, b) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return sortAsc ? dateA - dateB : dateB - dateA;
                });

                setPosts(filtered);
            } catch (error) {
                console.error("Failed to load posts", error);
            }
        }

        fetchData();
    }, [searchTitle, searchAuthor, sortAsc]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <input
                        type="text"
                        placeholder="Search by title"
                        className="border px-3 py-2 rounded w-full sm:w-64 text-black"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by author"
                        className="border px-3 py-2 rounded w-full sm:w-64 text-black"
                        value={searchAuthor}
                        onChange={(e) => setSearchAuthor(e.target.value)}
                    />
                    <button
                        onClick={() => setSortAsc((prev) => !prev)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Sort by Date {sortAsc ? "↑" : "↓"}
                    </button>
                </div>

                <div className="space-y-6">
                    {posts.map((post) => (
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
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="mt-12 text-gray-500 text-center">
                        No posts found.
                    </div>
                )}
            </div>
        </div>
    );
}