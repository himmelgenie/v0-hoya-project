"use client";

import { useState, useEffect } from "react";
import { Send, ThumbsUp, ArrowLeft } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "hoya" | "user";
  content: string;
  isHighlight?: boolean;
}

interface ChatScreenProps {
  medicine?: string;
  category?: string;
  onNavigate?: (screen: string, data?: Record<string, unknown>) => void;
}

// LLM API 연결을 위한 함수 - 나중에 실제 API로 교체하세요
async function callLLM(medicineName: string, userQuestion?: string): Promise<string> {
  // TODO: 여기에 실제 LLM API 코드를 추가하세요
  // 예시:
  // const response = await fetch('/api/chat', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ medicine: medicineName, question: userQuestion })
  // });
  // const data = await response.json();
  // return data.message;

  // 임시 응답 (API 연결 전)
  if (userQuestion) {
    return `'${userQuestion}'에 대한 정보를 불러오려면 LLM API를 연결해주세요! (call_llm 함수에 API 코드를 추가하면 돼요)`;
  }
  return `'${medicineName}'에 대한 정보를 불러오려면 LLM API를 연결해주세요! (call_llm 함수에 API 코드를 추가하면 돼요)`;
}

export function ChatScreen({ medicine = "약 이름", onNavigate }: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 초기 메시지 설정 - 사용자 질문과 호야 응답
  useEffect(() => {
    const initChat = async () => {
      // 사용자의 검색어를 오른쪽 말풍선으로 표시
      const userMessage: ChatMessage = {
        id: "1",
        sender: "user",
        content: `"${medicine}" 이게 뭐야?`,
      };
      setMessages([userMessage]);

      // 호야 응답 로딩
      setIsLoading(true);
      try {
        const response = await callLLM(medicine);
        const hoyaMessage: ChatMessage = {
          id: "2",
          sender: "hoya",
          content: response,
        };
        setMessages(prev => [...prev, hoyaMessage]);
      } catch (error) {
        console.error("LLM API 오류:", error);
        const errorMessage: ChatMessage = {
          id: "2",
          sender: "hoya",
          content: "앗, 정보를 불러오는 데 문제가 생겼어요. 다시 시도해볼까요?",
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [medicine]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
    };

    setMessages(prev => [...prev, newMessage]);
    const question = inputValue;
    setInputValue("");

    // LLM API 호출
    setIsLoading(true);
    try {
      const response = await callLLM(medicine, question);
      const hoyaResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "hoya",
        content: response,
      };
      setMessages(prev => [...prev, hoyaResponse]);
    } catch (error) {
      console.error("LLM API 오류:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "hoya",
        content: "앗, 답변을 불러오는 데 문제가 생겼어요.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      if (onNavigate) {
        onNavigate("search");
      }
    }, 500);
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate("search");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Back to search button */}
      <div className="px-4 pt-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[var(--surface-container-high)] text-sm font-medium text-[var(--foreground)] touch-scale hover:bg-[var(--surface-container-highest)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          다시 검색
        </button>
      </div>

      {/* Title */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-[var(--primary)]">Ho-YA가 알려줄게!</h1>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-56 space-y-6">
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
            
            <div className={`max-w-[75%]`}>
              {message.sender === "hoya" && (
                <span className="text-xs text-[var(--muted-foreground)] ml-1 mb-1 block">호야</span>
              )}
              
              <div
                className={`rounded-3xl px-5 py-4 ${
                  message.sender === "hoya"
                    ? "surface-container-lowest ambient-shadow"
                    : "bg-[var(--primary-fixed)]"
                }`}
              >
                <p className="text-base leading-relaxed text-[var(--foreground)]">
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex-shrink-0 mr-2">
              <img 
                src="/images/chick_default.png" 
                alt="호야" 
                className="w-12 h-12 object-contain animate-bounce"
              />
            </div>
            <div className="surface-container-lowest rounded-3xl px-5 py-4 ambient-shadow">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm button */}
      <div className="fixed bottom-40 left-0 right-0 flex justify-center px-6">
        <button
          onClick={handleConfirm}
          className={`px-12 py-4 rounded-full font-bold text-lg touch-scale transition-all ${
            confirmed
              ? "bg-[var(--tertiary-container)] text-[var(--tertiary)]"
              : "bg-[var(--primary)] text-white"
          }`}
        >
          {confirmed ? "확인 완료!" : "알겠어요!"}
          <ThumbsUp className="inline-block ml-2 w-5 h-5" />
        </button>
      </div>

      {/* Input area */}
      <div className="fixed bottom-0 left-0 right-0 glassmorphism px-4 py-4 pb-8">
        <div className="max-w-md mx-auto">
          <p className="text-sm font-semibold text-[var(--foreground)] mb-2 px-1">더 궁금한 게 있어요?</p>
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="호야에게 더 물어보세요!"
              disabled={isLoading}
              className="w-full h-14 pl-5 pr-16 rounded-full bg-[var(--surface-container-high)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-container)] transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center touch-scale disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="전송"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
