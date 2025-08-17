"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function Handlelogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok) {
      if (data.user.Role === "coach")
        router.push(`/sessions?userId=${data.user.Id}`);
      if (data.user.Role === "manager")
        router.push(`/manager?userId=${data.user.Id}`);
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-black rounded-2xl shadow-xl p-8 border border-yellow-400">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xl shadow-lg">
          <img src="logo.JPG" alt="b2bimpact" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-yellow-300 mb-8">
          Box 2 Box Impact
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-yellow-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-800 text-yellow-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Login button */}
        <button
          onClick={Handlelogin}
          className="w-full py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition duration-200 shadow-md"
        >
          Login
        </button>

        {/* Extra links */}
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-yellow-300 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
