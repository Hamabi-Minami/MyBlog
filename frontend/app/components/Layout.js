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
                                <p className="font-semibold text-gray-800 mb-2">🧭 Outline</p>
                                <ul className="space-y-2 ml-1">
                                    <li>
                                        <a className="hover:text-blue-600 flex items-center gap-1">
                                            📘 Introduction
                                        </a>
                                        <ul className="ml-4 mt-1 space-y-1">
                                            <li>
                                                <a className="hover:text-blue-600 flex items-center gap-1">
                                                    🔹 What is FastAPI?
                                                </a>
                                            </li>
                                            <li>
                                                <a className="hover:text-blue-600 flex items-center gap-1">
                                                    🔹 Why choose FastAPI?
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a className="hover:text-blue-600 flex items-center gap-1">
                                            📗 Getting Started
                                        </a>
                                        <ul className="ml-4 mt-1 space-y-1">
                                            <li>
                                                <a className="hover:text-blue-600 flex items-center gap-1">
                                                    🔹 Installation
                                                </a>
                                            </li>
                                            <li>
                                                <a className="hover:text-blue-600 flex items-center gap-1">
                                                    🔹 First API Endpoint
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a className="hover:text-blue-600 flex items-center gap-1">
                                            📙 Advanced Usage
                                        </a>
                                    </li>
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
                                        <img
                                            src={"/avatar.png"}
                                            alt="avatar"
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <p className="font-medium text-gray-900"> {user.username}</p>
                                        <p>Logged in</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-medium text-gray-900"> Guest</p>
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
                <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
            </footer>
        </div>
    );
}
