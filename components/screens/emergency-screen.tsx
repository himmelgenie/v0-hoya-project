"use client";

import { Phone, Asterisk, ChevronRight, AlertTriangle } from "lucide-react";

export function EmergencyScreen() {
  const handleCallParents = () => {
    // In a real app, this would trigger a phone call
    window.location.href = "tel:";
  };

  const handleCall119 = () => {
    window.location.href = "tel:119";
  };

  return (
    <div className="flex flex-col px-6 pt-4 pb-28">
      {/* Emergency alert banner */}
      <div className="w-full rounded-2xl bg-[#FFEBEE] px-4 py-3 flex items-center gap-3 mb-8">
        <AlertTriangle className="w-5 h-5 text-[#E53935]" />
        <span className="text-base font-medium text-[#C62828]">응급 상황 알림</span>
      </div>

      {/* Emergency chick */}
      <div className="flex justify-center mb-6">
        <img 
          src="/images/chick_emer.png" 
          alt="응급 상황 병아리" 
          className="w-40 h-40 object-contain"
        />
      </div>

      {/* Message card */}
      <div className="w-full surface-container-lowest rounded-[2rem] p-8 mb-8 ambient-shadow text-center">
        <h2 className="text-2xl font-bold text-[var(--destructive)] mb-2 leading-tight">
          지금 바로<br />도움이 필요해요!
        </h2>
        <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
          많이 아프군요.<br />걱정 마세요, 곧 도움을 줄 거예요.
        </p>
      </div>

      {/* Action buttons */}
      <div className="space-y-4">
        {/* Call parents */}
        <button
          onClick={handleCallParents}
          className="w-full rounded-[1.5rem] p-5 flex items-center justify-between touch-scale transition-all hover:scale-[0.98] active:scale-95"
          style={{ backgroundColor: "var(--call-blue)" }}
          aria-label="엄마 아빠 전화하기"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-sm text-white/80">가족에게 알리기</span>
              <span className="block text-xl font-bold text-white">엄마/아빠 전화하기</span>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white/60" />
        </button>

        {/* Call 119 */}
        <button
          onClick={handleCall119}
          className="w-full rounded-[1.5rem] p-5 flex items-center justify-between touch-scale transition-all hover:scale-[0.98] active:scale-95"
          style={{ backgroundColor: "var(--call-red)" }}
          aria-label="119 호출"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Asterisk className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-sm text-white/80">긴급 구조 요청</span>
              <span className="block text-xl font-bold text-white">119 호출</span>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white/60" />
        </button>
      </div>

      {/* Footer message */}
      <p className="text-center text-sm text-[var(--muted-foreground)] mt-8">
        Ho-YA는 언제나 여러분의 안전을 지킵니다.
      </p>
    </div>
  );
}
