"use client";

import { ChevronRight } from "lucide-react";

interface SymptomScreenProps {
  onNavigate: (screen: string, data?: Record<string, string>) => void;
}

const symptoms = [
  {
    id: "headache",
    name: "머리가 아파요",
    image: "/images/symptom_head.jpg",
  },
  {
    id: "stomachache", 
    name: "배가 아파요",
    image: "/images/symptom_stomach.jpg",
  },
  {
    id: "bleeding",
    name: "피가 나요",
    image: "/images/symptom_blood.jpg",
  },
  {
    id: "runny-nose",
    name: "콧물이 나요",
    image: "/images/symptom_nose.jpg",
  },
];

export function SymptomScreen({ onNavigate }: SymptomScreenProps) {
  const handleSymptomClick = (symptomName: string) => {
    onNavigate("home", { symptom: symptomName });
  };

  const handleFindHospital = () => {
    onNavigate("emergency");
  };

  return (
    <div className="flex flex-col px-6 pt-8 pb-28">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          어디가 아픈가요?
        </h2>
        <p className="text-lg text-[var(--primary)] font-medium mt-1">
          도와줄게요!
        </p>
      </div>

      {/* Symptom cards grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {symptoms.map((symptom) => (
          <button
            key={symptom.id}
            onClick={() => handleSymptomClick(symptom.name)}
            className="surface-container-lowest rounded-[1.5rem] p-4 flex flex-col items-center touch-scale ambient-shadow transition-all hover:scale-[0.98] active:scale-95"
            aria-label={symptom.name}
          >
            <div className="w-24 h-24 flex items-center justify-center mb-2">
              <img 
                src={symptom.image} 
                alt={symptom.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-base font-semibold text-[var(--foreground)]">
              {symptom.name}
            </span>
          </button>
        ))}
      </div>

      {/* Emergency banner */}
      <button
        onClick={handleFindHospital}
        className="w-full bg-[var(--tertiary-container)] rounded-[1.5rem] p-5 flex items-center justify-between touch-scale transition-all hover:scale-[0.98] active:scale-95"
        aria-label="병원 찾기"
      >
        <div className="text-left">
          <span className="block text-lg font-bold text-[var(--on-tertiary-container)]">
            긴급 상황인가요?
          </span>
          <span className="block text-sm text-[var(--on-tertiary-container)] opacity-80 mt-1">
            바로 근처 응급실을 찾아보세요
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--on-tertiary-container)] bg-[var(--surface-container-lowest)] px-4 py-2 rounded-full">
            병원 찾기
          </span>
          <ChevronRight className="w-5 h-5 text-[var(--on-tertiary-container)]" />
        </div>
      </button>
    </div>
  );
}
