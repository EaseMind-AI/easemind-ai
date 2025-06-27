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
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("journalEntries")) || [];
      if (Array.isArray(saved)) {
        setEntries(saved);
      } else {
        throw new Error("Invalid journal data format");
      }
    } catch (e) {
      console.warn("⚠️ Could not load journal entries:", e);
      setStorageError(true);
    }

    setSuggestedPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  const handleSave = () => {
    if (!entry.trim()) return;

    const newEntry = {
      text: entry.trim(),
      date: new Date().toLocaleString()
    };

    try {
      const updated = [newEntry, ...entries];
      localStorage.setItem("journalEntries", JSON.stringify(updated));
      setEntries(updated);
      setEntry("");
      setSuggestedPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
      setStorageError(false);
    } catch (e) {
      console.error("⚠️ Failed to save journal entry:", e);
      setStorageError(true);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">📓 My Journal</h1>

      <div className="mb-4 bg-yellow-100 p-3 rounded">
        <p className="font-medium mb-1">💡 Need inspiration?</p>
        <button
          onClick={() => setEntry(suggestedPrompt)}
          className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          {suggestedPrompt}
        </button>
      </div>

      {storageError && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded text-sm">
          ⚠️ Could not load or save your journal. Please try refreshing or check browser storage settings.
        </div>
      )}

      <textarea
        placeholder="Write your thoughts..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={5}
        className="w-full p-3 border border-gray-300 rounded mb-4"
      />

      <button
        onClick={handleSave}
        className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
        Save Entry
      </button>

      <h2 className="text-xl font-semibold mb-2">🕰 Past Entries</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500 mb-4">No journal entries yet.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((e, index) => (
            <div key={index} className="p-3 border rounded bg-white shadow-sm">
              <p className="text-sm text-gray-500 mb-1">{e.date}</p>
              <p>{e.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link to="/"className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
