import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/">
                    <span className="text-xl font-bold text-gray-800 hover:text-gray-600 transition">📝 InsightPost</span>
                </Link>
                <div className="flex space-x-6">
                    <Link href="/posts">
                        <span className="text-gray-700 hover:text-gray-900 transition">Posts</span>
                    </Link>
                    <Link href="/dashboard">
                        <span className="text-gray-700 hover:text-gray-900 transition">Dashboard</span>
                    </Link>
                    <Link href="/login">
                        <span className="text-gray-700 hover:text-gray-900 transition">Login</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}