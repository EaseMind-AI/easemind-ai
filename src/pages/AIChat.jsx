import React, { useState } from "react";
import { Link } from "react-router-dom";

const prompts = [
  "How are you feeling right now?",
  "Is there something specific you'd like to talk about?",
  "Would you like a coping tool or a mindfulness exercise?",
];

function getAIReply(userText) {
  // Simple evidence-based reply logic
  if (/sad|down|depressed|unhappy|low/i.test(userText)) {
    return "I'm sorry you're feeling this way. Would you like to try a breathing exercise or talk about what's making you feel this way?";
  }
  if (/anxious|worried|nervous|panic/i.test(userText)) {
    return "Anxiety can be tough. Would you like a grounding technique or some tips to manage anxious thoughts?";
  }
  if (/happy|good|great|excited|joy/i.test(userText)) {
    return "That's wonderful to hear! Remember to celebrate these moments. Would you like to journal about it?";
  }
  if (/help|support|tool|exercise/i.test(userText)) {
    return "I can suggest coping tools like breathing, grounding, or muscle relaxation. Which would you like to try?";
  }
  return "Thank you for sharing. I'm here to support you. 🌿";
}

export default function AIChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hey 👋 I'm EaseMind — what's on your mind today?" },
    { sender: "ai", text: prompts[0] }
  ]);
  const [input, setInput] = useState("");
  const [promptIndex, setPromptIndex] = useState(1);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input.trim() };
    const aiReply = {
      sender: "ai",
      text: getAIReply(input.trim())
    };

    setMessages((prev) => [...prev, userMsg, aiReply]);
    setInput("");

    // Show next prompt if available
    if (promptIndex < prompts.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: prompts[promptIndex] }
        ]);
        setPromptIndex(promptIndex + 1);
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-4">🧠 EaseMind AI</h1>
      <div className="flex-1 overflow-y-auto space-y-3 bg-white border rounded p-4 mb-4 shadow-inner max-h-[60vh]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm p-2 rounded-md ${
              msg.sender === "user"
                ? "bg-blue-100 text-right ml-auto"
                : "bg-purple-50 text-left mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          className="flex-1 border rounded-l px-3 py-2 focus:outline-none"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={e => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-r hover:bg-purple-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
      <Link to="/" className="block text-center text-purple-500 mt-6 underline">
        ← Back to Home
      </Link>
    </div>
  );
}