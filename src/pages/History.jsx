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
    <div className="p-6 max-w-2xl mx-auto min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">📈 Mood History</h1>
      <p className="mb-2 text-gray-700 text-sm text-center">
        Reviewing your mood history can help you spot patterns and triggers, supporting emotional self-awareness and growth.
        <br />
        <span className="text-xs text-gray-500">
          Source: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5579396/" target="_blank" rel="noopener noreferrer" className="underline">NIH</a>
        </span>
      </p>

      {sortedDates.length === 0 ? (
        <p className="text-gray-400 mt-12 text-center">No mood entries yet. Track your mood to start building your history.</p>
      ) : (
        sortedDates.map((date) => (
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
        ))
      )}

      <div className="mt-auto pt-8 text-center">
        <Link to="/" className="btn btn-secondary">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}