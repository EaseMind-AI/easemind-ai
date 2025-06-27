import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Reminder() {
  const [time, setTime] = useState(localStorage.getItem("reminderTime") || "");

  const saveReminder = () => {
  if (!time) {
    alert("Please select a reminder time.");
    return;
  }
  localStorage.setItem("reminderTime", time);
  alert("Reminder time saved!");
};
  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🔔 Daily Reminder</h1>
      <p className="mb-4">Choose a time to be reminded to check in or journal.</p>

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <button
        onClick={saveReminder}
       className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
        Save Reminder
      </button>

      <Link
        to="/"
        className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
        ⬅ Back to Home
      </Link>
    </div>
  );
}
