import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const prompts = [
  "What made you smile today?",
  "Describe a moment you felt proud of yourself.",
  "What are you grateful for right now?",
  "What’s something that’s been on your mind lately?",
  "Describe a challenge you're facing and how you're handling it.",
  "How do you usually comfort yourself during hard times?",
  "Write about a recent win, big or small.",
  "What’s one thing you can do tomorrow to feel better?"
];

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [suggestedPrompt, setSuggestedPrompt] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("journalEntries")) || [];
      if (Array.isArray(saved)) setEntries(saved);
    } catch (e) {
      console.warn("Invalid journal data:", e);
    }

    setSuggestedPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  const handleSave = () => {
    if (!entry.trim()) return;

    const newEntry = {
      text: entry.trim(),
      date: new Date().toLocaleString()
    };
    const updatedEntries = [newEntry, ...entries];
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
    setEntry("");
    setSuggestedPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  return (
    <div className="p-6 pt-10 max-w-xl mx-auto min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">📓 My Journal</h1>

      <div className="mb-2 text-gray-700 text-sm text-center">
        Journaling is proven to reduce stress, improve mood, and boost self-awareness. <br />
        <span className="text-xs text-gray-500">
          Source: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6124958/" target="_blank" rel="noopener noreferrer" className="underline">NIH</a>
        </span>
      </div>

      <div className="mb-4 bg-yellow-100 p-3 rounded text-sm text-gray-800">
        💡 <span className="font-medium">Need inspiration?</span><br />
        <button
          onClick={() => setEntry(suggestedPrompt)}
          className="underline text-purple-700 mt-1"
        >
          {suggestedPrompt}
        </button>
      </div>

      <textarea
        placeholder="Write your thoughts..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={5}
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <button
        onClick={handleSave}
        className="w-full py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 mb-6 transition"
      >
        Save Entry
      </button>

      <h2 className="text-lg font-semibold mb-2 text-purple-600">🕰 Past Entries</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500 mb-4">No journal entries yet.</p>
      ) : (
        <div className="space-y-3">
          {entries.map((e, index) => (
            <div key={index} className="p-3 border rounded bg-white shadow-sm text-sm">
              <p className="text-gray-500 mb-1">{e.date}</p>
              <p className="text-gray-800">{e.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-8 text-center">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}