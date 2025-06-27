import React, { useState } from "react";
import { Link } from "react-router-dom";

const steps = [
  { prompt: "👀 Name 5 things you can see", count: 5 },
  { prompt: "🖐 Name 4 things you can touch", count: 4 },
  { prompt: "👂 Name 3 things you can hear", count: 3 },
  { prompt: "👃 Name 2 things you can smell", count: 2 },
  { prompt: "👅 Name 1 thing you can taste", count: 1 },
];

export default function GroundingTool() {
  const [stepIndex, setStepIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [allStepsDone, setAllStepsDone] = useState(false);

  const currentStep = steps[stepIndex];

  const handleChange = (value, index) => {
    const updated = { ...(responses[stepIndex] || []) };
    updated[index] = value;
    setResponses({ ...responses, [stepIndex]: updated });
  };

  const handleNext = () => {
    const currentResponses = responses[stepIndex] || {};
    const allFilled = Object.keys(currentResponses).length === currentStep.count &&
      Object.values(currentResponses).every(val => val.trim() !== "");

    if (!allFilled) {
      alert("Please complete all fields before continuing.");
      return;
    }

    if (stepIndex === steps.length - 1) {
      setAllStepsDone(true);
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🧍 5-4-3-2-1 Grounding Tool</h1>

      {!allStepsDone ? (
        <>
          <p className="mb-4 text-lg font-medium">{currentStep.prompt}</p>
          <div className="space-y-2 mb-4">
            {Array.from({ length: currentStep.count }).map((_, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Item ${idx + 1}`}
                value={(responses[stepIndex] && responses[stepIndex][idx]) || ""}
                onChange={(e) => handleChange(e.target.value, idx)}
                className="w-full p-2 border rounded"
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
            Next
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">🎉 You Did It!</h2>
          <p className="text-gray-700 mb-4">
            You’ve grounded yourself successfully. You can repeat this exercise whenever you feel overwhelmed.
          </p>
        </div>
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
