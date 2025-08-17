'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

 async function Handlelogin()
  {
    
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      
      if (data.user.Role == "coach")
        router.push(`/sessions?userId=${data.user.Id}`);
      if (data.user.Role == "manager")
        router.push(`/manager?userId=${data.user.Id}`);
    } else {
    
    }
  }
  return (
    <>
     <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2"
        />
    <button onClick={Handlelogin}>Login</button>
    </>
  );
}
