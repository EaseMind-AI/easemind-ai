import React, { useState } from "react";
import { Link } from "react-router-dom";

const steps = [
  "💆‍♂️ Find a quiet space and sit or lie down comfortably.",
  "👣 Start with your feet: tense your foot muscles for 5 seconds, then release.",
  "🦵 Move to your legs: tighten your thigh muscles, hold, then relax.",
  "🤲 Clench your fists tightly, hold for 5 seconds, and release slowly.",
  "💪 Tense your arms and shoulders, then let them drop gently.",
  "😬 Tighten your jaw and scrunch your face, hold, and release.",
  "🧘 Take a deep breath, hold for 4 seconds, and exhale slowly.",
  "🌬 Repeat deep breathing and focus on the calmness in your body.",
];

export default function MuscleRelaxationTool() {
  const [stepIndex, setStepIndex] = useState(0);
  const isComplete = stepIndex >= steps.length;

  const handleNext = () => {
    if (!isComplete) setStepIndex(stepIndex + 1);
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">💆‍♂️ Muscle Relaxation</h1>

      {!isComplete ? (
        <>
          <p className="text-lg mb-6 text-gray-700">{steps[stepIndex]}</p>
          <button
            onClick={handleNext}
           className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
            Next
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">🎉 Well Done!</h2>
          <p className="text-gray-700 mb-4">
            You’ve completed the muscle relaxation exercise. Come back anytime you need to reset.
          </p>
        </>
      )}

      <Link
        to="/coping"
        className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
        ⬅ Back to Coping Tools
      </Link>
    </div>
  );
}
