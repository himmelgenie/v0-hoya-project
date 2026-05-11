"use client";

import { AlertTriangle } from "lucide-react";

interface PainLevelScreenProps {
  onNavigate: (screen: string, data?: Record<string, string>) => void;
}

export function PainLevelScreen({ onNavigate }: PainLevelScreenProps) {
  return (
    <div className="flex flex-col px-6 pt-8 pb-28">
      {/* Main question */}
      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
        얼마나 아픈가요?
      </h2>
      <p className="text-lg text-[var(--muted-foreground)] mb-10">
        아이의 현재 상태를 알려주세요.
      </p>

      {/* Pain level cards */}
      <div className="space-y-5">
        {/* Mild pain */}
        <button
          onClick={() => onNavigate("symptom")}
          className="w-full surface-container-lowest rounded-[2rem] p-6 flex items-center justify-between touch-scale ambient-shadow transition-all hover:scale-[0.98] active:scale-95 relative overflow-hidden"
          aria-label="조금 아파요"
        >
          <div className="text-left z-10">
            <span className="block text-2xl font-bold text-[var(--foreground)]">조금 아파요</span>
            <span className="block text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
              활동하기 괜찮고<br />잘 놀아요
            </span>
          </div>
          
          {/* Background circle */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#E0F7FA] opacity-60" />
          
          {/* Chick illustration */}
          <div className="relative z-10">
            <img 
              src="/images/less.png" 
              alt="조금 아파요" 
              className="w-28 h-28 object-contain"
            />
          </div>
        </button>

        {/* Severe pain */}
        <button
          onClick={() => onNavigate("emergency")}
          className="w-full rounded-[2rem] p-6 flex items-center justify-between touch-scale ambient-shadow transition-all hover:scale-[0.98] active:scale-95 relative overflow-hidden bg-[var(--secondary-container)]"
          aria-label="많이 아파요"
        >
          <div className="text-left z-10">
            <span className="block text-2xl font-bold text-[var(--foreground)]">많이 아파요</span>
            <span className="block text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
              계속 울고 있거나 움직이<br />기 힘들어요
            </span>
          </div>
          
          {/* Background triangle */}
          <div className="absolute right-8 top-4 z-0">
            <AlertTriangle className="w-20 h-20 text-[var(--destructive)] opacity-20" />
          </div>
          
          {/* Chick illustration */}
          <div className="relative z-10">
            <img 
              src="/images/hard.png" 
              alt="많이 아파요" 
              className="w-28 h-28 object-contain"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
