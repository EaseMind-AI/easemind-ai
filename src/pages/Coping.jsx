import React from 'react';
import { Link } from 'react-router-dom';

export default function Coping() {
  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🧠 Coping Tools</h1>
      <p className="mb-2 text-gray-700">
        Coping tools are practical, evidence-based strategies to help you manage stress, anxiety, and difficult emotions. Choose a tool below to begin your wellness practice.
      </p>
      <p className="mb-6 text-xs text-gray-500">
        <span>Source: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5579396/" target="_blank" rel="noopener noreferrer" className="underline">NIH</a></span>
      </p>

      <div className="flex flex-col gap-4">
        <Link
          to="/coping/breathing"
          className="btn btn-primary"
        >
          🌬 Breathing Exercise
        </Link>

        <Link
          to="/coping/grounding"
          className="btn btn-primary"
        >
          🧍 5-4-3-2-1 Grounding
        </Link>

        <Link
          to="/coping/muscle"
          className="btn btn-primary"
        >
          💆‍♂️ Muscle Relaxation
        </Link>

        <button
          disabled
          className="btn btn-primary opacity-60 cursor-not-allowed"
        >
          🧩 CBT Challenge (Coming Soon)
        </button>
      </div>

      <Link
        to="/"
        className="btn btn-secondary mt-6"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
}