"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "./api/post";
import BlogLayout from "./components/Layout";
import { formatDateLocal } from "./utils/tools";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPosts();
        const latestPosts = res.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);
        setPosts(latestPosts);
      } catch (error) {
        console.error("Failed to load posts", error);
      }
    }
    fetchData();
  }, []);

  return (
      <BlogLayout>
        <div className="space-y-6">
          {/*<h1 className="text-4xl font-bold mb-4 text-gray-800">🌟 Insight Blog</h1>*/}
          {/*<p className="text-gray-600 mb-6">Discover, Share & Comment on exciting articles</p>*/}

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

          {posts.length === 0 && (
              <div className="mt-12 text-gray-500 text-center">
                No posts yet. Be the first to write one!
              </div>
          )}

          {posts.length > 0 && (
              <div className="text-center pt-8">
                <Link href="/post">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Find More →
                  </button>
                </Link>
              </div>
          )}
        </div>
      </BlogLayout>
  );
}
