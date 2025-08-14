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
      <p className="mb-2 text-gray-700">
        Progressive muscle relaxation is a proven technique to reduce stress and anxiety by tensing and relaxing muscle groups. <br />
        <span className="text-xs text-gray-500">
          Source: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5579396/" target="_blank" rel="noopener noreferrer" className="underline">NIH</a>
        </span>
      </p>
      <p className="mb-4 text-gray-600">
        Follow each step below. Take your time and notice how your body feels after each release.
      </p>

      {!isComplete ? (
        <>
          <p className="text-lg mb-6 text-gray-700">{steps[stepIndex]}</p>
          <button
            onClick={handleNext}
            className="btn btn-primary"
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
        className="btn btn-secondary mt-4"
      >
        ⬅ Back to Coping Tools
      </Link>
    </div>
  );
}