"use client";

import { useState } from "react";
import { HoyaChick } from "@/components/hoya-chick";
import { SpeechBubble } from "@/components/speech-bubble";
import { Search } from "lucide-react";

interface SearchScreenProps {
  onNavigate: (screen: string, data?: Record<string, string>) => void;
}

export function SearchScreen({ onNavigate }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onNavigate("chat", { medicine: searchQuery });
    }
  };

  return (
    <div className="flex flex-col items-center px-6 pt-8 pb-28">
      {/* Speech bubble */}
      <SpeechBubble position="bottom" className="mb-4">
        <p className="text-lg font-medium text-[var(--foreground)] text-center">
          어떤 약인지 알려주세요!
        </p>
      </SpeechBubble>

      {/* Chick mascot */}
      <HoyaChick variant="waving" size="lg" className="mb-8" />

      {/* Search input */}
      <div className="w-full relative mb-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="약 이름을 검색해보세요"
          className="w-full h-14 pl-5 pr-16 rounded-[2rem] bg-[var(--surface-container-lowest)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-container)] transition-all ambient-shadow"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--primary-fixed)] flex items-center justify-center touch-scale"
          aria-label="검색"
        >
          <Search className="w-5 h-5 text-[var(--foreground)]" />
        </button>
      </div>

      {/* Example text */}
      <p className="w-full text-sm text-[var(--muted-foreground)] pl-2">
        예: 부루펜, 타이레놀, 챔프 등
      </p>
    </div>
  );
}
