import React from "react";

export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-indigo-200 via-purple-200 to-purple-300">
      <div className="text-center animate-fade-in">
        <div className="text-4xl font-bold text-purple-800 mb-2">EaseMind AI</div>
        <div className="text-lg text-gray-700">Taking care of your mind 💛</div>
      </div>
    </div>
  );
}
