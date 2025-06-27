import React, { useState } from "react";
import { Link } from "react-router-dom";

const responses = {
  happy: [
    "That's amazing! 😊 What brought the joy today?",
    "I'm glad you're feeling happy! Want to share why?",
    "Happiness looks great on you. 🌞"
  ],
  sad: [
    "I'm sorry you're feeling this way. 💙 Do you want to talk about it?",
    "It’s okay to feel sad sometimes. I’m here for you.",
    "Sending you comfort. Would sharing help a little?"
  ],
  anxious: [
    "Take a deep breath. 🌿 You're not alone.",
    "Anxiety can be tough. Want to explore what's on your mind?",
    "Let’s slow things down together. What’s bothering you?"
  ],
  excited: [
    "That's exciting! 🎉 Tell me more about what happened.",
    "I love that energy! What’s making you feel so hyped?",
    "Sounds like something awesome just happened!"
  ],
  angry: [
    "It's okay to feel angry. What triggered this emotion?",
    "Let it out. What’s bothering you right now?",
    "Anger is valid. Let’s unpack it together."
  ],
  default: [
    "I'm here for you. Tell me more.",
    "That’s interesting. Would you like to go deeper?",
    "Hmm, go on… I’m listening carefully."
  ]
};

const detectMood = (text) => {
  const lowercase = text.toLowerCase();

  if (lowercase.includes("happy") || lowercase.includes("joy") || lowercase.includes("excited"))
    return "happy";
  if (lowercase.includes("sad") || lowercase.includes("depressed") || lowercase.includes("down"))
    return "sad";
  if (lowercase.includes("anxious") || lowercase.includes("worried") || lowercase.includes("nervous"))
    return "anxious";
  if (lowercase.includes("angry") || lowercase.includes("mad") || lowercase.includes("frustrated"))
    return "angry";
  if (lowercase.includes("excited") || lowercase.includes("hype") || lowercase.includes("ecstatic"))
    return "excited";

  return "default";
};

export default function AIChat() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there 👋 How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const mood = detectMood(input);
    const botReplies = responses[mood] || responses.default;
    const botMessage = {
      from: "bot",
      text: botReplies[Math.floor(Math.random() * botReplies.length)]
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">🧠 EaseMind AI</h1>
      
      <div className="flex-1 overflow-y-auto bg-gray-100 rounded-lg p-4 mb-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-xs ${
              msg.from === "bot"
                ? "bg-white text-left self-start"
                : "bg-purple-100 text-right self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Say something..."
          className="flex-1 p-3 border rounded-lg"
        />
        <button
          onClick={handleSend}
         className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
>
          Send
        </button>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
