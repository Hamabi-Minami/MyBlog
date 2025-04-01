"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "./api/post";
import Navbar from "./components/Navbar";


export default function Home() {
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

  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">🌟 My Blog</h1>
          <p className="text-gray-600 mb-12">Discover, Share & Comment on exciting articles</p>
          <Navbar />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100 cursor-pointer">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900">{post.title}</h2>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>✍️ {post.author?.username}</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
            ))}
          </div>

          {posts.length === 0 && (
              <div className="mt-12 text-gray-500">No posts yet. Be the first to write one!</div>
          )}
        </div>
      </div>
  );
}
