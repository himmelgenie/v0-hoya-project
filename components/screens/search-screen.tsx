"use client";

import { useState } from "react";
import { HoyaChick } from "@/components/hoya-chick";
import { SpeechBubble } from "@/components/speech-bubble";
import { Search, Beaker, Pill, Stethoscope, MoreHorizontal } from "lucide-react";

interface SearchScreenProps {
  onNavigate: (screen: string, data?: Record<string, string>) => void;
}

const categories = [
  {
    id: "fever",
    name: "해열제",
    icon: Beaker,
    color: "bg-[#E0F7FA]",
    iconColor: "text-[#00897B]",
  },
  {
    id: "cold",
    name: "감기약",
    icon: Pill,
    color: "bg-[#FFF3E0]",
    iconColor: "text-[#FB8C00]",
  },
  {
    id: "digestion",
    name: "소화제",
    icon: Stethoscope,
    color: "bg-[#FCE4EC]",
    iconColor: "text-[#E91E63]",
  },
  {
    id: "other",
    name: "기타",
    icon: MoreHorizontal,
    color: "bg-[var(--surface-container-high)]",
    iconColor: "text-[var(--foreground)]",
  },
];

export function SearchScreen({ onNavigate }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onNavigate("chat", { medicine: searchQuery });
    }
  };

  const handleCategoryClick = (category: string) => {
    onNavigate("chat", { category });
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
      <p className="w-full text-sm text-[var(--muted-foreground)] mb-8 pl-2">
        예: 부루펜, 타이레놀, 챔프 등
      </p>

      {/* Frequently searched */}
      <div className="w-full">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">자주 찾는 약</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="surface-container-lowest rounded-[1.5rem] p-5 flex items-center gap-3 touch-scale ambient-shadow transition-all hover:scale-[0.98] active:scale-95"
              aria-label={category.name}
            >
              <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
                <category.icon className={`w-6 h-6 ${category.iconColor}`} />
              </div>
              <span className="text-base font-semibold text-[var(--foreground)]">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
