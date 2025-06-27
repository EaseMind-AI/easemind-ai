import React, { useState } from "react";
import { Link } from "react-router-dom";

const moods = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😊", label: "Content" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😟", label: "Worried" },
  { emoji: "😢", label: "Sad" },
];

const emotions = [
  "Anxious", "Hopeful", "Tired", "Motivated",
  "Overwhelmed", "Grateful", "Angry", "Peaceful"
];

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [tags, setTags] = useState([]);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(""); // ✅ new

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    // ✅ Validation
    if (!selectedMood || tags.length === 0) {
      setError("Please select a mood and at least one emotion.");
      return;
    }

    setError(""); // clear error

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const moodEntry = {
      mood: selectedMood,
      emotions: tags,
      note,
      date: todayStr,
    };

    const existing = JSON.parse(localStorage.getItem("moodEntries")) || [];
    localStorage.setItem("moodEntries", JSON.stringify([moodEntry, ...existing]));

    // --- Streak Logic ---
    const streakData = JSON.parse(localStorage.getItem("streakData")) || {
      currentStreak: 0,
      longestStreak: 0,
      lastEntryDate: null
    };

    const lastDate = streakData.lastEntryDate;
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (lastDate === todayStr) {
      // Already submitted today, do nothing
    } else if (lastDate === yesterdayStr) {
      // Continue streak
      streakData.currentStreak += 1;
    } else {
      // Missed a day or first time
      streakData.currentStreak = 1;
    }

    if (streakData.currentStreak > streakData.longestStreak) {
      streakData.longestStreak = streakData.currentStreak;
    }

    streakData.lastEntryDate = todayStr;
    localStorage.setItem("streakData", JSON.stringify(streakData));

    setSubmitted(true);
  };

  if (submitted) {
    const streakData = JSON.parse(localStorage.getItem("streakData"));

    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Mood Saved ✅</h2>
        <p>Thanks for checking in today! Come back tomorrow!</p>

        <div className="mt-4 text-sm text-gray-700">
          🔥 <strong>Streak:</strong> {streakData?.currentStreak || 1} day(s)<br />
          🌟 <strong>Longest Streak:</strong> {streakData?.longestStreak || 1} day(s)
        </div>

        <button
          onClick={() => {
            setSelectedMood(null);
            setTags([]);
            setNote("");
            setSubmitted(false);
          }}
         className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          Track Another Mood
        </button>

        <div className="mt-4">
          <Link
            to="/history"
           className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
            📈 View Mood History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Track Your Mood</h1>

      <div className="mb-6 text-center">
        <p className="mb-2">How are you feeling today?</p>
        <div className="flex justify-center gap-4">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => setSelectedMood(m)}
              className={`text-4xl transition transform hover:scale-110 p-2 rounded-full ${
                selectedMood?.label === m.label
                  ? "bg-purple-100 ring-4 ring-purple-600"
                  : "bg-white"
              }`}
            >
              {m.emoji}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center">
  <Link
    to="/"
    className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
    ⬅ Back to Home
  </Link>
  </div>

      <div className="mb-6">
        <p className="mb-2">Tag your emotions:</p>
        <div className="flex flex-wrap gap-2">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              onClick={() => toggleTag(emotion)}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                tags.includes(emotion)
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-gray-200 text-gray-800 border-gray-300"
              }`}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      <textarea
        placeholder="Add a note (optional)..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        className="w-full mb-6 p-3 border rounded-lg"
      />

      {/* 🔴 Error message */}
      {error && (
        <div className="mb-4 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className={`w-full py-3 text-white font-semibold rounded-lg transition ${
          selectedMood && tags.length > 0
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit Mood
      </button>
    </div>
  );
}
