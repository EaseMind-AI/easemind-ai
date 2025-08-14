import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setName(localStorage.getItem('username') || '');
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  const saveProfile = () => {
    localStorage.setItem('username', name);
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    alert('Profile saved!');
  };

  const exportCSV = (entries, filename) => {
    if (!entries.length) return alert("No entries to export.");
    const headers = Object.keys(entries[0]).join(",");
    const rows = entries.map(entry =>
      Object.values(entry).map(value =>
        `"${typeof value === 'object' ? JSON.stringify(value) : value}"`
      ).join(",")
    );
    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const exportJSON = (entries, filename) => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const exportData = (key, type) => {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const filename = `${key}_export.${type}`;
    if (type === "csv") {
      exportCSV(data, filename);
    } else {
      exportJSON(data, filename);
    }
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to delete all data? This action cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">👤 My Profile</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Your Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Theme Preference:</label>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === "light"}
              onChange={() => setTheme("light")}
            />
            ☀️ Light
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === "dark"}
              onChange={() => setTheme("dark")}
            />
            🌙 Dark
          </label>
        </div>
      </div>

      <button
        onClick={saveProfile}
        className="mb-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Profile
      </button>

      <div className="mb-6 p-4 bg-gray-100 rounded text-sm text-gray-700">
        🔒 <strong>Privacy Notice:</strong> All your data is stored locally in your browser. It never leaves your device. You can export or clear it anytime.
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">🗂 Export My Data</h2>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
          <button
            onClick={() => exportData("moodEntries", "csv")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            📄 Export Mood Entries (CSV)
          </button>
          <button
            onClick={() => exportData("journalEntries", "csv")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            📄 Export Journal Entries (CSV)
          </button>
          <button
            onClick={() => exportData("moodEntries", "json")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            🗃 Export Mood Entries (JSON)
          </button>
          <button
            onClick={() => exportData("journalEntries", "json")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            🗃 Export Journal Entries (JSON)
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">🗑 Reset</h2>
        <button
          onClick={clearAllData}
          className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          🗑 Clear All My Data
        </button>
      </div>

     <div className="mt-auto pt-8 text-center">
  <Link to="/" className="btn btn-secondary">
    ⬅ Back to Home
  </Link>
</div>
    </div>
  );
}
