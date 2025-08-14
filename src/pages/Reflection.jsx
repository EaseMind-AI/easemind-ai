import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";

export default function Reflection() {
  const [entries, setEntries] = useState([]);
  const [mostMood, setMostMood] = useState(null);
  const [commonEmotion, setCommonEmotion] = useState("N/A");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("moodEntries");
      if (!stored) return;
      const data = JSON.parse(stored);
      if (!Array.isArray(data)) return;

      setEntries(data);

      const moodMap = {};
      const emotionMap = {};

      data.forEach((entry) => {
        if (entry.mood?.label) {
          moodMap[entry.mood.label] = (moodMap[entry.mood.label] || 0) + 1;
        }
        if (Array.isArray(entry.emotions)) {
          entry.emotions.forEach((emotion) => {
            emotionMap[emotion] = (emotionMap[emotion] || 0) + 1;
          });
        }
      });

      const topMood = Object.entries(moodMap).sort((a, b) => b[1] - a[1])[0];
      const topEmotion = Object.entries(emotionMap).sort((a, b) => b[1] - a[1])[0];

      setMostMood(topMood ? topMood[0] : null);
      setCommonEmotion(topEmotion ? topEmotion[0] : "N/A");
    } catch (err) {
      console.warn("Reflection data error:", err);
    }
  }, []);

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col justify-between p-6 max-w-xl mx-auto bg-white text-center">
        <div className="pt-12">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">📊 Reflection Stats</h1>
          <p className="text-gray-700 mb-2 text-sm">
            Self-reflection helps you understand your emotional patterns and supports personal growth. <br />
            <span className="text-xs text-gray-500">
              Source: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5579396/" target="_blank" rel="noopener noreferrer" className="underline">NIH</a>
            </span>
          </p>
          <p className="text-gray-600 mb-8 text-sm">
            Here’s a quick overview of your mood journey so far.
          </p>

          {entries.length === 0 ? (
            <p className="text-gray-400 mt-12">
              No mood data yet. Check in with your mood to start building insights.
            </p>
          ) : (
            <div className="space-y-6 text-left bg-gray-50 rounded-lg p-5 shadow-sm text-sm text-gray-700">
              <div>
                <span className="font-medium">✅ Most Frequent Mood:</span>{" "}
                <span className="text-purple-600 font-semibold">{mostMood || "N/A"}</span>
              </div>
              <div>
                <span className="font-medium">🌟 Most Common Emotion:</span>{" "}
                <span className="text-purple-600 font-semibold">{commonEmotion || "N/A"}</span>
              </div>
              <div>
                <span className="font-medium">🧾 Total Mood Entries:</span>{" "}
                <span className="text-purple-600 font-semibold">{entries.length}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="text-sm text-blue-600 hover:underline inline-block mt-6"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </AnimatedPage>
  );
}