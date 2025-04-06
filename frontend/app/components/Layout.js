"use client";
import Navbar from "@/app/components/Navbar";
import {useEffect, useState} from "react";

export default function BlogLayout({ children }) {
    const[user, setUser] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem("username");
        const expiresAt = parseInt(localStorage.getItem("expires_at") || "0");

        if (username && Date.now() < expiresAt) {
            setUser({ username });
        } else {
            localStorage.removeItem("access_token");
            localStorage.removeItem("username");
            localStorage.removeItem("expires_at");
            setUser(null);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Main layout */}
            <div className="w-full px-4 sm:px-6 xl:px-12 py-6">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-6">

                    {/* Left Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-20">
                            <div className="bg-white shadow rounded-xl p-4 text-sm text-gray-600">
                                <p className="font-semibold text-gray-800 mb-2">Navigation</p>
                                <ul className="space-y-2">
                                    <li><a href="/category/tech" className="hover:text-blue-600">📱 Tech</a></li>
                                    <li><a href="/category/life" className="hover:text-blue-600">🧠 Life</a></li>
                                    <li><a href="/category/travel" className="hover:text-blue-600">🌍 Travel</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <main>{children}</main>

                    {/* Right Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-20">
                            <div className="bg-white shadow rounded-xl p-4 text-sm text-gray-600">
                                {user ? (
                                    <>
                                        <p className="font-medium text-gray-900">👤 {user.username}</p>
                                        <p>Logged in</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-medium text-gray-900">👤 Guest</p>
                                        <p>Not logged in</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-gray-500 py-6 border-t">
                <p>© {new Date().getFullYear()} Insight Blog. All rights reserved.</p>
            </footer>
        </div>
    );
}
