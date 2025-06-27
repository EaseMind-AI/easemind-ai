import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Reflection() {
  const [entries, setEntries] = useState([]);
  const [mostMood, setMostMood] = useState("N/A");
  const [commonEmotion, setCommonEmotion] = useState("N/A");
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("moodEntries");
      if (!stored) return;

      const data = JSON.parse(stored);
      if (!Array.isArray(data)) throw new Error("Data is not an array");

      setEntries(data);

      const moodMap = {};
      const emotionMap = {};

      data.forEach((entry) => {
        const moodLabel = entry?.mood?.label;
        if (moodLabel) {
          moodMap[moodLabel] = (moodMap[moodLabel] || 0) + 1;
        }

        const emotions = Array.isArray(entry?.emotions) ? entry.emotions : [];
        emotions.forEach((emotion) => {
          emotionMap[emotion] = (emotionMap[emotion] || 0) + 1;
        });
      });

      const topMood = Object.entries(moodMap).sort((a, b) => b[1] - a[1])[0];
      const topEmotion = Object.entries(emotionMap).sort((a, b) => b[1] - a[1])[0];

      setMostMood(topMood ? topMood[0] : "N/A");
      setCommonEmotion(topEmotion ? topEmotion[0] : "N/A");
    } catch (err) {
      console.warn("Reflection data error:", err);
      setStorageError(true);
    }
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">📊 Reflection Stats</h1>

      {storageError && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded text-sm">
          ⚠️ Could not load your mood data. Please check your browser settings or refresh.
        </div>
      )}

      {entries.length === 0 ? (
        <p className="text-gray-500">No mood data yet. Check in with your mood to start building reflection insights.</p>
      ) : (
        <div className="space-y-3 text-lg">
          <p>✅ Most Frequent Mood: <strong>{mostMood}</strong></p>
          <p>🌟 Most Common Emotion: <strong>{commonEmotion}</strong></p>
          <p>🧾 Total Mood Entries: <strong>{entries.length}</strong></p>
        </div>
      )}

      <Link
        to="/"
        className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
        ⬅ Back to Home
      </Link>
    </div>
  );
}
