"use client";

import { SpeechBubble } from "@/components/speech-bubble";
import { Clipboard, Search, Info } from "lucide-react";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="flex flex-col items-center px-6 pt-8 pb-28">
      {/* Speech bubble */}
      <SpeechBubble position="bottom" className="mb-4">
        <p className="text-lg font-medium text-[var(--foreground)] text-center">
          궁금해요!
        </p>
      </SpeechBubble>

      {/* Chick mascot */}
      <img 
        src="/images/chick_find.png" 
        alt="약을 찾는 병아리" 
        className="w-40 h-40 object-contain mb-8"
      />

      {/* Main question */}
      <h2 className="text-2xl font-bold text-[var(--foreground)] text-center mb-2">
        집에 약이 있나요?
      </h2>
      <p className="text-base text-[var(--muted-foreground)] text-center mb-8">
        비상 상비약을 확인해볼까요?
      </p>

      {/* Option buttons */}
      <div className="w-full space-y-4">
        {/* Yes option */}
        <button
          onClick={() => onNavigate("search")}
          className="w-full surface-container-lowest rounded-[2rem] p-6 flex items-center justify-between touch-scale ambient-shadow transition-all hover:scale-[0.98] active:scale-95 bg-[var(--primary-fixed)]"
          aria-label="네, 준비되어 있어요"
        >
          <div className="text-left">
            <span className="block text-2xl font-bold text-[var(--foreground)]">네</span>
            <span className="block text-sm text-[var(--muted-foreground)] mt-1">준비되어 있어요!</span>
          </div>
          <div className="w-14 h-14 rounded-xl bg-[var(--surface-container-high)] flex items-center justify-center">
            <Clipboard className="w-7 h-7 text-[var(--primary)]" />
          </div>
        </button>

        {/* No option */}
        <button
          onClick={() => onNavigate("search")}
          className="w-full surface-container-lowest rounded-[2rem] p-6 flex items-center justify-between touch-scale ambient-shadow transition-all hover:scale-[0.98] active:scale-95"
          aria-label="아니요, 찾으러 가야 해요"
        >
          <div className="text-left">
            <span className="block text-2xl font-bold text-[var(--foreground)]">아니요</span>
            <span className="block text-sm text-[var(--muted-foreground)] mt-1">찾으러 가야 해요</span>
          </div>
          <div className="w-14 h-14 rounded-xl bg-[var(--surface-container-high)] flex items-center justify-center">
            <Search className="w-7 h-7 text-[var(--foreground)]" />
          </div>
        </button>
      </div>

      {/* Info tip */}
      <div className="w-full mt-8 rounded-2xl bg-[var(--secondary-container)] p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[var(--primary-fixed)] flex items-center justify-center flex-shrink-0">
          <Info className="w-4 h-4 text-[var(--foreground)]" />
        </div>
        <p className="text-sm text-[var(--foreground)]">
          상비약 유통기한도 같이 확인하면 좋아요!
        </p>
      </div>
    </div>
  );
}
