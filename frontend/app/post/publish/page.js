"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import {publishPost} from "../../api/post";

export default function PublishPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState(null);

    async function handlePublish(e) {
        e.preventDefault();
        try {
            const res = await publishPost({ title, content });
            if (res.status === 200 || res.status === 201) {
                setMessage("Post published successfully.");
                setTimeout(() => router.push("/"), 1000);
            }
        } catch (err) {
            setMessage("Failed to publish. Please check your credentials or input.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Create a New Post</h1>

                {message && (
                    <div className="mb-4 text-center text-sm text-blue-600">{message}</div>
                )}

                <form onSubmit={handlePublish} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Title</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Content</label>
                        <textarea
                            rows={10}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your content here..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Publish
                    </button>
                </form>
            </div>
        </div>
    );
}
