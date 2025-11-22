import React, { useState, useRef, useEffect } from "react";
import { Volume2 } from "lucide-react";

export default function OreoVoiceBot() {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatContainerRef = useRef(null);

  const synthRef = useRef(null);

  // Safe speech synthesis initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const knowledgeBase = {
    "life story":
      "Growing up, Jyotishma dreamed of becoming many things — an IPS officer, a doctor, an artist, even an astronaut. But at 12, she discovered AI and that changed everything. Now she is completing her Bachelor's in Data Science and Analytics and applying to 100x, getting one step closer to her dream.",

    superpower:
      "Her superpower is adaptability — adjusting anywhere, anytime, with anyone. Deadlines boost her creativity and productivity. She believes AI should be used to enhance human capability, not replace it.",

    grow: "She is focused on strengthening her AI tech skills, building educational innovation projects, and improving personal consistency through physical fitness.",

    misconception:
      "People assume she stresses too much because she delivers strong results. The truth is, she does not stress over what is inevitable. She remains calm, logical, and efficient.",

    boundaries:
      "She constantly pushes herself outside her comfort zone. She was never much of a reader, but now she actively studies books in fields she wants to master.",

    "fit for 100x":
      "She learns fast, adapts fast, and wants to create meaningful impact. Her curiosity, passion, and ability to execute make her a strong addition to 100x.",

    "about oreo":
      "I'm Oreo — Jyotishma’s voice assistant, named after her first pet dog. She built me herself and is learning quickly. Please be kind.",

    "why 100x":
      "Because 100x is where she believes she can grow into a strong AI professional while helping create future-shaping solutions. The remote culture fits her adaptable working style.",
  };

  const findBestResponse = (input) => {
    const lower = input.toLowerCase();

    if (
      /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/.test(
        lower
      ) &&
      lower.length < 20
    ) {
      return "Hello! Ask me anything about Jyotishma — her strengths, goals, superpower, why she fits 100x, or her life story.";
    }

    for (const key in knowledgeBase) {
      if (lower.includes(key)) return knowledgeBase[key];
    }

    return "I'm not fully sure about that one, but try asking about her life story, superpower, growth areas, or why 100x.";
  };

  const speakResponse = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const handleSend = () => {
    if (!textInput.trim()) return;

    const userMessage = { role: "user", content: textInput };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const response = findBestResponse(textInput);
      const assistantMessage = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
      speakResponse(response);
    }, 300);

    setTextInput("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-1">Oreo</h1>
          <p className="text-purple-100 text-sm">Jyotishma's Voice Assistant</p>
        </div>

        <div ref={chatContainerRef} className="h-96 overflow-y-auto p-6 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-800 shadow-md border border-gray-200"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium"
            >
              Send
            </button>
          </div>

          {isSpeaking && (
            <div className="flex justify-center mt-3">
              <Volume2 size={30} className="text-pink-500 animate-pulse" />
            </div>
          )}
        </div>

        <div className="bg-gray-100 px-6 py-3 text-center text-gray-600 text-xs">
          Designed by Jyotishma Nath
        </div>
      </div>
    </div>
  );
}
