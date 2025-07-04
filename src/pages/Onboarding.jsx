import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("light");
  const [reminderTime, setReminderTime] = useState("");

  useEffect(() => {
    const existingName = localStorage.getItem("userName");
    if (existingName) {
      navigate("/"); // Already onboarded
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("userName", name.trim());
    localStorage.setItem("theme", theme);
    if (reminderTime) {
      localStorage.setItem("reminderTime", reminderTime);
    }

    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">👋 Welcome to EaseMind AI</h1>
      <p className="mb-6 text-gray-600">Let's personalize your experience.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-left font-medium">Your Name:</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-left font-medium">Choose Theme:</label>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`px-4 py-2 rounded border ${
                theme === "light"
                  ? "bg-yellow-100 border-yellow-500"
                  : "bg-white border-gray-300"
              }`}
            >
              ☀️ Light
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`px-4 py-2 rounded border ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              🌙 Dark
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-left font-medium">
            Set Daily Reminder (optional):
          </label>
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        <button
          type="submit"
         className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          Finish Setup
        </button>
      </form>
    </div>
  );
}
