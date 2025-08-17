"use client";
import { useSearchParams } from "next/navigation"; // Import hook for reading URL query params

import { useEffect, useState } from "react";

export default function Sessions() {
  const [sessions, setSessions] = useState<any[]>([]); // State to hold courses

  const searchParams = useSearchParams(); // Get search params from URL

  const userId = searchParams?.get("userId"); // Extract userId from query params

  //   const handleSignOut = () => { // Function to handle sign out
  //     // Optional: Clear any stored data or session here
  //     router.push('http://localhost:3000'); // Redirect to home page

  useEffect(() => {
    // Fetch courses when component mounts
    fetch(`/api/sessions?userId=${userId}`) // Call API endpoint for courses
      .then((res) => res.json()) // Parse JSON response
      .then((data) => setSessions(data)) // Store courses in state

      .catch((err) => console.error("Fetch error:", err)); // Log fetch errors
  }, []);
  function formatDateOnly(dateString: string) {
    return new Date(dateString).toISOString().split("T")[0]; // "YYYY-MM-DD"
  }
  const currentMonth = new Date(2025, 7); // Month is 0-indexed → 7 = August
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();
  return (
  <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
    <div className="text-yellow-300 font-semibold mb-2">{monthName}</div>
    <h2 className="text-2xl font-bold text-yellow-400 mb-6">
      Sessions Calendar
    </h2>

    <div className="grid grid-cols-7 gap-3 text-center">
      {/* Weekday headers */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-sm font-semibold text-yellow-300">
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {Array.from({ length: 31 }).map((_, day) => {
        const dateString = `2025-08-${String(day + 1).padStart(2, "0")}`;
        const daySessions = sessions.filter(
          (s) => formatDateOnly(s.Date) === dateString
        );

        return (
          <div
            key={day}
            className={`border rounded-lg p-2 min-h-[90px] flex flex-col items-start justify-start text-left transition-all duration-200 ${
              daySessions.length > 0
                ? "bg-yellow-100 border-yellow-400 shadow-sm"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            {/* Date number */}
            <span className="text-xs font-bold text-gray-900 mb-1">
              {day + 1}
            </span>

            {/* Session info */}
            {daySessions.map((session, idx) => (
              <div
                key={idx}
                className="w-full mb-1 rounded-lg bg-black text-yellow-300 text-[10px] px-2 py-1 leading-tight shadow-inner"
              >
                <p className="font-semibold text-sm">{session.TypeOfSession}</p>
                <p className="text-[10px]">{session.Time}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  </div>
);

}
