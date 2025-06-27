import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function BreathingTool() {
  const [phase, setPhase] = useState("Ready?");
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cycle, setCycle] = useState(0);

  const phases = useMemo(() => [
    { label: "Breathe In", duration: 4 },
    { label: "Hold", duration: 4 },
    { label: "Breathe Out", duration: 6 },
    { label: "Hold", duration: 2 },
  ], []);

  useEffect(() => {
    if (!isRunning) return;

    if (countdown === 0) {
      const next = (cycle + 1) % phases.length;
      setPhase(phases[next].label);
      setCountdown(phases[next].duration);
      setCycle(next);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isRunning, cycle, phases]);

  const startExercise = () => {
    setIsRunning(true);
    setPhase(phases[0].label);
    setCountdown(phases[0].duration);
    setCycle(0);
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🧘 Breathing Exercise</h1>
      <p className="mb-4 text-gray-700">
        Follow this calming breathing pattern to help reduce stress and anxiety.
      </p>

      <div className="my-6">
        <div className="text-4xl font-semibold mb-2">{phase}</div>
        {isRunning ? (
          <div className="text-6xl font-bold text-purple-600">{countdown}</div>
        ) : (
          <button
            onClick={startExercise}
           className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
            Start Breathing
          </button>
        )}
      </div>

      <Link
        to="/coping"
        className="inline-block mt-6 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
      >
        ⬅ Back to Coping Tools
      </Link>
    </div>
  );
}
