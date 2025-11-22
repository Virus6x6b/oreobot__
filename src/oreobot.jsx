import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";

export default function OreoVoiceBot() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [hasGreeted, setHasGreeted] = useState(false);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    synthRef.current = window.speechSynthesis;
  }
}, []);

  const chatContainerRef = useRef(null);

  const knowledgeBase = {
    "life story":
      "Growing up, Jyotishma dreamed of becoming so many things - an IPS officer, a doctor, an artist, even an astronaut. But at 12, she discovered AI, and it completely changed her path. Back then, she could never have imagined what AI would become. Her 12-year-old self would be absolutely amazed by today's possibilities. Now, she wants to be part of creating that same sense of wonder for others - building technology that shapes the future for billions, just like McCarthy's work inspired her younger self.Now as she is applying to 100x, she herself is a step closer to pursuing her dream as she is about to complete her Bachelors in Data science and analytics.",

    superpower:
      "Jyotishma's superpower is being able to adjust anywhere, with anything, anytime. Deadlines actually fuel her creativity and give her that ultimate productivity boost! What looks like pressure to others becomes her secret weapon. Another thing - while others worry about AI creating job market problems, which is a valid concern, she believes we should use AI to make our skills stronger. By implementing it in our daily work schedule, we can make effective and productive changes that boost our work life and provide even more effective results.",

    grow: "She's focused on three areas: First, deepening her expertise in AI and the technologies she'll be working with. Second, creating innovative solutions for education - that's her passion. And third, building consistency with physical fitness by incorporating regular workouts. Growth for her means both professional excellence and personal well-being.",

    misconception:
      "People often think she works too hard or stresses too much because she delivers quality outputs consistently. But the truth? She doesn't stress over things that are inevitable. This mindset helps her stay relaxed and focused, which actually makes her more effective. She works smart, not stressed!",

    boundaries:
      "She's constantly stepping outside her comfort zone. For example, she wasn't much of a reader before, but now she actively reads books in fields she's curious about. She's always implementing new habits to better herself, and there's a lot more she'd love to discuss once selected!",

    "fit for 100x":
      "As a final-year student, Jyotishma brings intense curiosity - she's always eager to learn and implements new concepts quickly. She thrives in dynamic environments and has genuine enthusiasm for helping 100x grow. Her fresh perspective combined with technical skills and people-first attitude make her a great addition to the team.",

    "why 100x":
      "Jyotishma wants to join 100x because it's the perfect place for her to grow as an AI professional while making real impact. She's drawn to 100x's aim and goal (Specially while applying and filling upt the google form, it made me really excited) Plus, the remote work culture aligns perfectly with my adaptable work style, and Jyotishma is so excited about the possibility of growing with a forward-thinking company that values innovation and creativity.",

    "about oreo":
      "Hey there! I'm Oreo, Jyotishma's voice assistant for this interview assessment. I'm named after her first ever pet dog (She loved her with all her heart) Jyotishma designed and built me herself (With ofcourse guidance (PS: I won't let my AI lie man)), and honestly she is sorry as creating a full fledged website or AI is VERY new to her and it's not the best she can do (BUT she can learn VERY fast, give her a chance).",
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!hasGreeted) {
      setTimeout(() => {
        const greeting =
          "Hi! I'm Oreo, Jyotishma's voice assistant. I'm here to answer your questions about her.";
        setMessages([{ role: "assistant", content: greeting }]);
        speakResponse(greeting);
        setHasGreeted(true);
      }, 1000);
    }
  }, [hasGreeted]);

  useEffect(() => {
 if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {

      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript("Listening...");
      };

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        handleUserInput(speechResult);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setTranscript("");
      };

      recognition.onend = () => {
        setIsListening(false);
        setTranscript("");
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const findBestResponse = (input) => {
    const lowerInput = input.toLowerCase();

    if (
      /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/.test(
        lowerInput,
      ) &&
      lowerInput.length < 20
    ) {
      return "Hello! Nice to hear from you! Ask me anything about Jyotishma, her background, skills, or why she's perfect for 100x (I mean you gotta know T-T)";
    }

    if (
      lowerInput.includes("who are you") ||
      lowerInput.includes("tell me about yourself") ||
      lowerInput.includes("about you") ||
      lowerInput.includes("oreo") ||
      lowerInput.includes("your name") ||
      lowerInput.includes("made you") ||
      lowerInput.includes("created you") ||
      lowerInput.includes("built you")
    ) {
      return knowledgeBase["about oreo"];
    }

    if (
      lowerInput.includes("life story") ||
      lowerInput.includes("background") ||
      (lowerInput.includes("tell me about") &&
        lowerInput.includes("jyotishma")) ||
      lowerInput.includes("who is jyotishma")
    ) {
      return knowledgeBase["life story"];
    }

    if (
      lowerInput.includes("superpower") ||
      lowerInput.includes("super power") ||
      lowerInput.includes("strength")
    ) {
      return knowledgeBase["superpower"];
    }

    if (
      lowerInput.includes("grow") ||
      lowerInput.includes("growth") ||
      lowerInput.includes("improve") ||
      lowerInput.includes("develop") ||
      lowerInput.includes("areas")
    ) {
      return knowledgeBase["grow"];
    }

    if (
      lowerInput.includes("misconception") ||
      lowerInput.includes("coworker") ||
      lowerInput.includes("colleague") ||
      lowerInput.includes("peer")
    ) {
      return knowledgeBase["misconception"];
    }

    if (
      lowerInput.includes("boundaries") ||
      lowerInput.includes("limit") ||
      lowerInput.includes("push") ||
      lowerInput.includes("challenge")
    ) {
      return knowledgeBase["boundaries"];
    }

    if (
      lowerInput.includes("100x") ||
      lowerInput.includes("fit") ||
      lowerInput.includes("why hire") ||
      lowerInput.includes("why choose")
    ) {
      return knowledgeBase["fit for 100x"];
    }

    if (
      lowerInput.includes("why") &&
      (lowerInput.includes("100x") ||
        lowerInput.includes("join") ||
        lowerInput.includes("want") ||
        lowerInput.includes("company"))
    ) {
      return knowledgeBase["why 100x"];
    }

    return "Hmm, I'm not sure about that specific question. Try asking me about Jyotishma's life story, superpower, growth areas, or anything about her";
  };

  const handleUserInput = (input) => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const response = findBestResponse(input);
      const assistantMessage = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
      speakResponse(response);
    }, 300);
  };

  const speakResponse = (text) => {
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = synthRef.current.getVoices();
    const femaleVoice =
      voices.find(
        (voice) =>
          voice.name.includes("Female") ||
          voice.name.includes("Samantha") ||
          voice.name.includes("Victoria") ||
          voice.name.includes("Google US English Female") ||
          voice.name.includes("Microsoft Zira"),
      ) || voices.find((voice) => voice.lang.includes("en"));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  useEffect(() => {
    if (synthRef.current.getVoices().length === 0) {
      synthRef.current.addEventListener("voiceschanged", () => {});
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript("");
      recognitionRef.current?.start();
    }
  };

  const stopSpeaking = () => {
    synthRef.current.cancel();
    setIsSpeaking(false);
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleUserInput(textInput);
      setTextInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTextSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-1">Oreo</h1>
          <p className="text-purple-100 text-sm">Jyotishma's Voice Assistant</p>
        </div>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="h-96 overflow-y-auto p-6 bg-gray-50"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
            >
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

        {/* Status */}
        {transcript && (
          <div className="px-6 py-2 bg-purple-100 text-purple-700 text-center text-sm">
            {transcript}
          </div>
        )}

        {/* Controls */}
        <div className="p-6 bg-white border-t border-gray-200">
          {/* Voice Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleListening}
              disabled={isSpeaking}
              className={`p-6 rounded-full transition-all transform hover:scale-105 shadow-lg ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-purple-500 hover:bg-purple-600"
              } ${isSpeaking ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isListening ? (
                <MicOff size={32} className="text-white" />
              ) : (
                <Mic size={32} className="text-white" />
              )}
            </button>

            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="ml-4 p-6 rounded-full bg-pink-500 hover:bg-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <Volume2 size={32} className="text-white animate-pulse" />
              </button>
            )}
          </div>

          {/* Text Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              disabled={isSpeaking}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 text-gray-800"
            />
            <button
              onClick={handleTextSubmit}
              disabled={isSpeaking || !textInput.trim()}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Send
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-3 text-center text-gray-600 text-xs">
          Designed by Jyotishma Nath (Made in a hurry lol)
        </div>
      </div>
    </div>
  );
}

