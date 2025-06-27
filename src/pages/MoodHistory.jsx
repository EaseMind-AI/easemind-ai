import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MoodHistory() {
  const [groupedMoods, setGroupedMoods] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("moodEntries");
    if (!stored) return;

    try {
      const entries = JSON.parse(stored);
      if (!Array.isArray(entries)) return;

      const groups = entries.reduce((acc, entry) => {
        const date = entry.date || "Unknown Date";
        if (!acc[date]) acc[date] = [];
        acc[date].push(entry);
        return acc;
      }, {});
      setGroupedMoods(groups);
    } catch (err) {
      console.error("Failed to parse mood data:", err);
    }
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d)
      ? dateStr
      : d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">📈 Mood History</h1>

      {Object.keys(groupedMoods).length === 0 ? (
        <p className="text-center text-gray-500">No mood entries found yet.</p>
      ) : (
        Object.entries(groupedMoods).map(([date, moods]) => (
          <div key={date} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{formatDate(date)}</h2>
            <div className="space-y-3">
              {moods.map((entry, i) => (
                <div key={i} className="p-3 border rounded bg-white shadow-sm">
                  <p className="text-lg">
                    Mood: {entry.mood?.emoji || "N/A"}{" "}
                    <span className="text-sm text-gray-500">
                      ({entry.mood?.label || "Unknown"})
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Emotions:{" "}
                    {entry.emotions?.length
                      ? entry.emotions.join(", ")
                      : "N/A"}
                  </p>
                  {entry.note && (
                    <p className="text-sm text-gray-600 italic">“{entry.note}”</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <div className="mt-6 text-center">
        <Link to="/" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
