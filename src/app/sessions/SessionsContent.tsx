"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SessionsContent() {
  const searchParams = useSearchParams();
  const [sessions, setSessions] = useState([]);
  const userId = searchParams?.get("userId");

  useEffect(() => {
    fetch(`/api/sessions?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [userId]);

  function formatDateOnly(dateString: any) {
    return new Date(dateString).toISOString().split("T")[0];
  }
  // Changed to January 2024 to match your test data
  const currentMonth = new Date(2024, 0); // 0 = January
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
        {Array.from({ length: 31 }).map((_, day: number) => {
          const dateString = `2024-01-${String(day + 1).padStart(2, "0")}`;
          const daySessions = sessions.filter((s: any) => formatDateOnly(s.Date) === dateString);

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
              {daySessions.map((session: any, idx: number) => (
                <div
                  key={idx}
                  className="w-full mb-1 rounded-lg bg-black text-yellow-300 text-[10px] px-2 py-1 leading-tight shadow-inner"
                >
                  <p className="font-semibold text-sm">{session.sessionType}</p>
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
