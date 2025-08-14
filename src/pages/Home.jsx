import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
  });

  const [showReminder, setShowReminder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      navigate("/onboarding");
      return;
    }

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

  const features = [
    { to: "/ai", icon: "🧠", label: "Talk to AI" },
    { to: "/mood", icon: "❤️", label: "Track My Mood" },
    { to: "/journal", icon: "📓", label: "Write in Journal" },
    { to: "/coping", icon: "🧘", label: "Coping Tools" },
    { to: "/reminder", icon: "🔔", label: "Set Reminder" },
    { to: "/profile", icon: "👤", label: "My Profile" },
    { to: "/reflection", icon: "📊", label: "Reflection Stats" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4 flex flex-col items-center justify-start">
      <header className="w-full max-w-xl text-center pt-8 pb-4">
        <h1 className="text-4xl font-bold text-purple-700 mb-2">EaseMind AI</h1>
        <p className="text-md text-gray-600">Hi {userName}, glad you're here 💛</p>
        <p className="text-sm text-gray-500 italic mt-1">Healing isn’t linear — and that’s okay 🌼</p>
        <p className="text-xs text-gray-500 mt-2">
          EaseMind uses evidence-based tools to support your emotional wellness. <br />
          <span>
            Source: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5579396/" target="_blank" rel="noopener noreferrer" className="underline">NIH</a>
          </span>
        </p>
      </header>

      {showReminder && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 text-sm rounded p-3 mb-4 w-full max-w-xl text-center">
          ⏰ Don't forget to check in or journal today!
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-4 w-full max-w-xl mb-6 text-sm text-gray-700 text-center">
        🔥 <strong>Current Streak:</strong> {streakData.currentStreak} day(s)<br />
        🌟 <strong>Longest Streak:</strong> {streakData.longestStreak} day(s)
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-xl mb-8">
        {features.map((feature) => (
          <Link
            key={feature.to}
            to={feature.to}
            className="home-btn flex flex-col items-center justify-center py-6 px-4 bg-white shadow-lg rounded-xl hover:bg-purple-50 transition"
            style={{ minHeight: "120px" }}
          >
            <span className="text-3xl mb-2">{feature.icon}</span>
            <span className="font-semibold text-base">{feature.label}</span>
          </Link>
        ))}
      </div>

      <footer className="text-xs text-gray-400 mb-4 text-center">
        &copy; {new Date().getFullYear()} EaseMind AI — Be kind to your mind 💜
      </footer>
    </div>
  );
}