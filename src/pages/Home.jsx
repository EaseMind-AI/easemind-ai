import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
  });

  const [showReminder, setShowReminder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔁 Redirect new users who haven't onboarded
    const userName = localStorage.getItem("userName");
    if (!userName) {
      navigate("/onboarding");
      return;
    }

    // 📊 Load streak data
    let data = { currentStreak: 0, longestStreak: 0 };
    try {
      const saved = JSON.parse(localStorage.getItem("streakData"));
      if (saved && typeof saved === "object") {
        data = saved;
      }
    } catch (e) {
      console.warn("Streak data error:", e);
    }

    setStreakData(data);

    // ⏰ Check if reminder should show
    const reminderTime = localStorage.getItem("reminderTime");
    if (reminderTime) {
      const now = new Date();
      const [h, m] = reminderTime.split(":").map(Number);
      const reminder = new Date();
      reminder.setHours(h, m, 0, 0);
      if (now >= reminder) {
        setShowReminder(true);
      }
    }
  }, [navigate]);

  const userName = localStorage.getItem("userName");

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to EaseMind AI</h1>
      <p className="mb-2">Hi {userName}, glad you're here 💛</p>
      <p className="mb-4">Healing isn’t linear — and that’s okay 🌼</p>

      {showReminder && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded p-3 mb-4 text-sm">
          ⏰ Don't forget to check in or journal today!
        </div>
      )}

      <div className="bg-purple-100 p-4 rounded mb-6 text-sm text-gray-800">
        🔥 <strong>Current Streak:</strong> {streakData.currentStreak} day(s)<br />
        🌟 <strong>Longest Streak:</strong> {streakData.longestStreak} day(s)
      </div>

      {/* ✅ Updated button grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Link to="/ai" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition text-center">
          🧠 Talk to AI
        </Link>
        <Link to="/mood" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition text-center">
          ❤️ Track My Mood
        </Link>
        <Link to="/journal" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition text-center">
          📓 Write in Journal
        </Link>
        <Link to="/history" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition text-center">
          📈 View Mood History
        </Link>
        <Link to="/coping" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition text-center">
          🧘 Try Coping Tools
        </Link>
        <Link to="/reminder" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition text-center">
          🔔 Set Daily Reminder
        </Link>
        <Link to="/profile" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition text-center">
          👤 My Profile
        </Link>
        <Link to="/reflection" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition text-center">
          📊 Reflection Stats
        </Link>
      </div>
    </div>
  );
}
