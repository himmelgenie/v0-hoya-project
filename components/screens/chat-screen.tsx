"use client";

import { useState } from "react";
import { Send, ThumbsUp, Menu } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "hoya" | "user";
  content: string;
  isHighlight?: boolean;
}

interface ChatScreenProps {
  medicine?: string;
  category?: string;
  onMenuClick?: () => void;
}

export function ChatScreen({ medicine = "타이레놀", onMenuClick }: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "hoya",
      content: `${medicine}(Pill Name)은 이런 약이야!`,
      isHighlight: true,
    },
    {
      id: "2",
      sender: "hoya",
      content: "갑자기 열이 날 때나 몸이 아플 때 열을 내려주고 통증을 줄여주는 역할을 해. 감기 기운이 있을 때 친구가 되어주는 약이야!",
    },
    {
      id: "3",
      sender: "user",
      content: "어떻게 먹어야 해?",
    },
    {
      id: "4",
      sender: "hoya",
      content: "식사와 상관없이 먹을 수 있지만, 빈 속보다는 물과 함께 꿀꺽 삼키는 게 좋아. 하루에 정해진 양만큼만 먹기로 약속해요!",
      isHighlight: true,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate Hoya response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "hoya",
        content: "좋은 질문이야! 더 자세히 알려줄게요.",
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Custom header with menu */}
      <header className="sticky top-0 z-50 glassmorphism">
        <div className="max-w-md mx-auto flex items-center justify-between h-14 px-4">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-full touch-scale hover:bg-[var(--surface-container-high)] transition-colors"
            aria-label="메뉴"
          >
            <Menu className="w-5 h-5 text-[var(--foreground)]" />
          </button>
          <h1 className="text-xl font-bold text-[var(--foreground)] tracking-tight">Ho-YA</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-48 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.sender === "hoya" && (
              <div className="flex-shrink-0 mr-2">
                <img 
                  src="/images/chick_default.png" 
                  alt="호야" 
                  className="w-12 h-12 object-contain"
                />
              </div>
            )}
            
            <div className={`max-w-[75%] ${message.sender === "user" ? "order-first mr-2" : ""}`}>
              {message.sender === "hoya" && (
                <span className="text-xs text-[var(--muted-foreground)] ml-1 mb-1 block">호야</span>
              )}
              {message.sender === "user" && (
                <span className="text-xs text-[var(--muted-foreground)] mr-1 mb-1 block text-right">나</span>
              )}
              
              <div
                className={`rounded-3xl px-5 py-4 ${
                  message.sender === "hoya"
                    ? "surface-container-lowest ambient-shadow"
                    : "bg-[var(--primary-fixed)]"
                }`}
              >
                <p 
                  className="text-base leading-relaxed text-[var(--foreground)]"
                  dangerouslySetInnerHTML={{
                    __html: message.isHighlight 
                      ? message.content.replace(
                          /(타이레놀\(Pill Name\)|하루에 정해진 양만큼만 먹기로 약속해요!)/g, 
                          '<span class="text-[var(--primary)] font-semibold">$1</span>'
                        )
                      : message.content
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm button */}
      <div className="fixed bottom-36 left-0 right-0 flex justify-center px-6">
        <button
          onClick={handleConfirm}
          className={`px-12 py-4 rounded-full font-bold text-lg touch-scale transition-all ${
            confirmed
              ? "bg-[var(--tertiary-container)] text-[var(--tertiary)]"
              : "bg-[var(--primary)] text-white"
          }`}
        >
          {confirmed ? "확인 완료!" : "확인했어요!"}
          <ThumbsUp className="inline-block ml-2 w-5 h-5" />
        </button>
      </div>

      {/* Input area */}
      <div className="fixed bottom-0 left-0 right-0 glassmorphism px-4 py-4 pb-8">
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="호야에게 궁금한 걸 더 물어보세요!"
            className="w-full h-14 pl-5 pr-16 rounded-full bg-[var(--surface-container-high)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-container)] transition-all"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center touch-scale"
            aria-label="전송"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
