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

  const resetExercise = () => {
    setIsRunning(false);
    setPhase("Ready?");
    setCountdown(0);
    setCycle(0);
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🧘 Breathing Exercise</h1>
      <p className="mb-2 text-gray-700">
        Paced breathing (like 4-4-6-2) activates your parasympathetic nervous system, helping reduce stress and anxiety. <br />
        <span className="text-xs text-gray-500">Source: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/" target="_blank" rel="noopener noreferrer" className="underline">NIH</a></span>
      </p>
      <p className="mb-4 text-gray-600">
        Follow the instructions below. Try to repeat for at least 3 cycles.
      </p>

      <div className="my-6">
        <div className="text-4xl font-semibold mb-2">{phase}</div>
        {isRunning ? (
          <>
            <div className="text-6xl font-bold text-purple-600 mb-2" aria-live="polite">{countdown}</div>
            <button
              onClick={resetExercise}
              className="btn btn-secondary mt-2"
            >
              Reset
            </button>
          </>
        ) : (
          <button
            onClick={startExercise}
            className="btn btn-primary"
          >
            Start Breathing
          </button>
        )}
      </div>

      <Link
        to="/coping"
        className="btn btn-secondary mt-4"
      >
        ⬅ Back to Coping Tools
      </Link>
    </div>
  );
}