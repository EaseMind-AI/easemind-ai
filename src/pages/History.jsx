import React from "react";
import { Link } from "react-router-dom";

export default function History() {
  const moodEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];

  // Group by date
  const grouped = moodEntries.reduce((acc, entry) => {
    const date = new Date(entry.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a) // Newest to oldest
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📈 Mood History</h1>

      {sortedDates.map((date) => (
        <div key={date} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{date}</h2>
          <div className="space-y-3">
            {grouped[date].map((entry, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg bg-white shadow-sm"
              >
                <div className="text-xl">{entry.mood?.emoji} {entry.mood?.label}</div>
                {entry.emotions?.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Emotions: {entry.emotions.join(", ")}
                  </p>
                )}
                {entry.note && (
                  <p className="text-sm text-gray-700 mt-1">Note: {entry.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <Link to="/" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
