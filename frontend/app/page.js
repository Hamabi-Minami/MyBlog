"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "./api/post";
import Navbar from "./components/Navbar";
import PostsPage from "./post/page";

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
    console.log("API URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

    fetchData();
  }, []);

  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center my-10">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">🌟 Insight Blog</h1>
            <p className="text-gray-600">Discover, Share & Comment on exciting articles</p>
          </div>
          <PostsPage></PostsPage>
        </div>
      </div>
  );
}
