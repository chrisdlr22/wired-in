import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const categories = [
  { name: "📅 Calendar", path: "/calendar", color: "from-indigo-500 to-purple-500" },
  { name: "📔 Journal", path: "/journal", color: "from-pink-500 to-rose-500" },
  { name: "⏱ Timer", path: "/timer", color: "from-green-500 to-emerald-500" },
  { name: "✅ Tasks", path: "/tasks", color: "from-yellow-500 to-orange-500" },
];

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.email.split("@")[0]} 👋</h1>
      <h2 className="text-xl font-semibold mb-6">Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map(({ name, path, color }) => (
          <button
            key={name}
            onClick={() => router.push(path)}
            className={`p-6 rounded-xl bg-gradient-to-br ${color} shadow-md text-xl font-semibold hover:scale-105 transition-all`}
          >
            {name}
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}