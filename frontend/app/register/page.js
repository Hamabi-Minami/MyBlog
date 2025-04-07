"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../api/auth";

export default function Page() {
    const [username, setUsername] = useState("");
    const [account, setAccount] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const res = await register({ username, account, email, password });

            if (res.status === 201) {
                alert("Registration successful!");
                router.push("/login");
            }
        } catch (err) {
            if (err.response?.status === 400) {
                alert(err.response.data?.detail || "Account or email already exists!");
            } else {
                console.error("Register error", err);
                alert("Error occurred during registration.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700">Account</label>
                        <input
                            type="text"
                            placeholder="Enter your account"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?
                    <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}
