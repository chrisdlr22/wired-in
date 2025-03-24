import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Persist user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push("/home"); // Redirect to home after login/signup
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleAuth = async () => {
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h2>
            <button
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">
              {isLogin ? "Log In" : "Sign Up"}
            </h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <input
              className="w-full p-2 border border-gray-300 rounded mb-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded mb-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              onClick={handleAuth}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
            <button
              className="mt-4 text-blue-500 text-sm hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create an Account" : "Already have an account? Log In"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}