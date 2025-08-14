import React, { useState } from "react";
import { Link } from "react-router-dom";

const moods = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😠", label: "Angry" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😴", label: "Tired" }
];

const emotionList = [
  "Excited", "Grateful", "Lonely", "Hopeful", "Frustrated", "Relaxed", "Motivated", "Bored"
];

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [emotions, setEmotions] = useState([]);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!selectedMood) return;

    const entry = {
      date: new Date().toISOString().split("T")[0],
      mood: selectedMood,
      emotions,
      note
    };

    const existing = JSON.parse(localStorage.getItem("moodEntries")) || [];
    localStorage.setItem("moodEntries", JSON.stringify([entry, ...existing]));

    setSelectedMood(null);
    setEmotions([]);
    setNote("");
    alert("Mood saved!");
  };

  const toggleEmotion = (emotion) => {
    setEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">❤️ Track Your Mood</h1>

      <div className="mb-2 text-gray-700 text-sm text-center">
        Regular mood tracking can improve self-awareness and emotional regulation. <br />
        <span className="text-xs text-gray-500">
          Source: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5579396/" target="_blank" rel="noopener noreferrer" className="underline">NIH</a>
        </span>
      </div>

      <div className="mb-4">
        <p className="font-medium text-sm text-gray-700 mb-2">How do you feel right now?</p>
        <div className="grid grid-cols-6 gap-2">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood)}
              className={`p-2 text-lg rounded border ${
                selectedMood?.label === mood.label
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white border-gray-300 hover:border-purple-400"
              }`}
              aria-label={mood.label}
            >
              {mood.emoji}
              <span className="block text-xs mt-1">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-medium text-sm text-gray-700 mb-2">What emotions are you feeling?</p>
        <div className="flex flex-wrap gap-2">
          {emotionList.map((emotion) => (
            <button
              key={emotion}
              onClick={() => toggleEmotion(emotion)}
              className={`text-sm px-3 py-1 rounded-full border ${
                emotions.includes(emotion)
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white border-gray-300 hover:border-purple-400"
              }`}
              aria-pressed={emotions.includes(emotion)}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      <textarea
        className="w-full border border-gray-300 rounded p-3 text-sm mb-4"
        rows={4}
        placeholder="Optional note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
      >
        Save Mood
      </button>

      <div className="mt-auto pt-6 text-center">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}