"use client"
import { useEffect, useState } from "react";
import {login} from "../api/auth";
import { useRouter } from "next/navigation";

export default function Page()
{
    const [account, setAccount] = useState(null);
    const [password, setPassword] = useState(null);

    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    async function handleLogin() {
        try {
            const res = await login(account, password);
            if (res.status === 200 && res.data.access_token) {
                localStorage.setItem("access_token", res.data.access_token);
                alert("login successfull");
                router.push("/");
            } else {
                alert("login failed");
            }
        } catch (err) {
            console.error("login error", err);
            alert("login error");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form
                    onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const res = await handleLogin();
                        console.log(res);
                    } catch (err) {
                        console.error("Login failed");
                    }
                }}
                >
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="account">Account</label>
                        <input
                            type="text"
                            id="account"
                            name="account"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="Enter your account"
                            onChange={(e) => setAccount(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="Enter your password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?
                    <a href="/register" className="text-blue-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    )
}