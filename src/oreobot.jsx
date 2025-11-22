import React, { useState, useRef, useEffect } from "react";

export default function OreoVoiceBot() {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatContainerRef = useRef(null);

  const synthRef = useRef(null);

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

    grow: "She focuses on improving her AI abilities, building education-based innovation projects, and maintaining discipline through fitness and personal development.",

    misconception:
      "People assume she stresses too much because she consistently delivers quality work. In reality, she stays calm, logical, and focused — avoiding stress over things she cannot control.",

    boundaries:
      "She constantly pushes herself out of her comfort zone — like reading more even though she once disliked it — expanding her learning habits.",

    "fit for 100x":
      "She learns fast, adapts fast, and wants to create meaningful impact. Her curiosity, passion, and ability to execute make her a strong addition to 100x.",

    "about oreo":
      "I'm Oreo — Jyotishma’s voice assistant, named after her first pet dog. She built me herself while learning rapidly. Please be kind, it's her first real AI project.",

    "why 100x":
      "100x is where she believes she can grow into a strong AI professional while helping create future-shaping solutions. The remote culture fits her adaptable working style.",
  };

  const findBestResponse = (input) => {
    const lower = input.toLowerCase();

    if (/^(hi|hello|hey|yo|sup)/.test(lower)) {
      return "Hello! Ask me anything about Jyotishma — her strengths, goals, superpower, growth areas, or why she fits 100x.";
    }

    if (lower.includes("who are you") || lower.includes("about you") || lower.includes("oreo")) {
      return knowledgeBase["about oreo"];
    }

    if (lower.includes("life") || lower.includes("background") || lower.includes("about her")) {
      return knowledgeBase["life story"];
    }

    if (lower.includes("strength") || lower.includes("superpower") || lower.includes("power") || lower.includes("skills")) {
      return knowledgeBase["superpower"];
    }

    if (lower.includes("grow") || lower.includes("growth") || lower.includes("improve") || lower.includes("develop")) {
      return knowledgeBase["grow"];
    }

    if (lower.includes("misconception") || lower.includes("misunderstand")) {
      return knowledgeBase["misconception"];
    }

    if (lower.includes("challenge") || lower.includes("limits") || lower.includes("push")) {
      return knowledgeBase["boundaries"];
    }

    if (lower.includes("fit") || lower.includes("hire") || lower.includes("choose")) {
      return knowledgeBase["fit for 100x"];
    }

    if (lower.includes("why 100x") || (lower.includes("why") && lower.includes("100x"))) {
      return knowledgeBase["why 100x"];
    }

    return "Try asking about: life story, superpower, growth, boundaries, strengths, or why 100x.";
  };

  const speakResponse = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const handleSend = () => {
    if (!textInput.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: textInput }]);

    setTimeout(() => {
      const response = findBestResponse(textInput);
      speakResponse(response);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 300);

    setTextInput("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ padding: 20, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ width: "70%", maxWidth: 700, background: "white", borderRadius: 20, padding: 20 }}>
        <h1 style={{ fontSize: 32, fontWeight: "bold" }}>Oreo</h1>
        <p style={{ color: "#555", marginBottom: 20 }}>Jyotishma's Voice Assistant</p>

        <div ref={chatContainerRef} style={{ height: 350, overflowY: "auto", paddingRight: 10 }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left", marginBottom: 10 }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "10px 15px",
                  borderRadius: 15,
                  background: msg.role === "user" ? "#7c3aed" : "#eee",
                  color: msg.role === "user" ? "white" : "black",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask something..."
            style={{
              fl
