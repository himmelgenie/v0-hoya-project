"use client";

import { X } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[var(--surface-container-lowest)] rounded-[2rem] w-[85%] max-w-sm p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--surface-container-high)] transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-[var(--muted-foreground)]" />
        </button>

        {/* Profile content */}
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-[var(--primary)] flex items-center justify-center mb-4">
            <div className="w-16 h-16 text-6xl flex items-center justify-center">
              🐰
            </div>
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            도연
          </h2>

          {/* Info rows */}
          <div className="w-full space-y-3">
            {/* Age */}
            <div className="flex items-center justify-between bg-[var(--surface-container-low)] rounded-2xl px-5 py-4">
              <span className="text-[var(--muted-foreground)]">나이:</span>
              <span className="text-[var(--foreground)] font-medium">9세</span>
            </div>

            {/* Gender */}
            <div className="flex items-center justify-between bg-[var(--surface-container-low)] rounded-2xl px-5 py-4">
              <span className="text-[var(--muted-foreground)]">성별:</span>
              <span className="text-[var(--foreground)] font-medium">여</span>
            </div>

            {/* Parent phone */}
            <div className="bg-[var(--surface-container-low)] rounded-2xl px-5 py-4">
              <span className="block text-[var(--muted-foreground)] text-sm mb-1">부모님 번호</span>
              <span className="text-[var(--foreground)] font-bold text-lg">010-1234-5678</span>
            </div>
          </div>

          {/* Confirm button */}
          <button
            onClick={onClose}
            className="w-full mt-6 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold py-4 rounded-2xl touch-scale transition-all hover:opacity-90 active:scale-95"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
