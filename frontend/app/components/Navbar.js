"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        const expiresAt = parseInt(localStorage.getItem("expires_at") || "0");

        if (storedUser && Date.now() < expiresAt) {
            setUsername(storedUser);
        } else {
            setUsername(null); // token expired or no user
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("expires_at");
        setUsername(null);
        window.location.reload(); // refresh to reflect logout
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/">
          <span className="text-xl font-bold text-gray-800 hover:text-gray-600 transition">
            📝 My Blog
          </span>
                </Link>
                <div className="flex space-x-6">
                    <Link href="/post">
                        <span className="text-gray-700 hover:text-gray-900 transition">All Posts</span>
                    </Link>

                    {username ? (
                        <div className="flex space-x-6">
                            <Link href="/post/publish">
                                <span className="text-gray-700 hover:text-gray-900 transition">Publish</span>
                            </Link>
                            <Link href="/post/dashboard">
                                <span className="text-gray-700 hover:text-gray-900 transition">Dashboard</span>
                            </Link>
                            <button onClick={handleLogout} className="text-red-600 hover:underline">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <span className="text-blue-600 hover:underline">Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
