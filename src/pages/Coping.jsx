import React from 'react';
import { Link } from 'react-router-dom';

export default function Coping() {
  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🧠 Coping Tools</h1>
      <p className="mb-6 text-gray-700">
        Select a tool to begin your wellness practice:
      </p>

      <div className="flex flex-col gap-4">
        <Link
          to="/coping/breathing"
           className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          🌬 Breathing Exercise
        </Link>

        <Link
          to="/coping/grounding"
           className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          🧍 5-4-3-2-1 Grounding
        </Link>

        <Link
          to="/coping/muscle"
          className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          💆‍♂️ Muscle Relaxation
        </Link>

        <button
          disabled
           className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          🧩 CBT Challenge (Coming Soon)
        </button>
      </div>

      <Link
        to="/"
         className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
        ⬅ Back to Home
      </Link>
    </div>
  );
}
