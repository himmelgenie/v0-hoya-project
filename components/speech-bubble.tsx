"use client";

import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function SpeechBubble({ 
  children, 
  position = "bottom",
  className 
}: SpeechBubbleProps) {
  return (
    <div className={cn(
      "relative surface-container-lowest rounded-3xl px-6 py-4 ambient-shadow",
      className
    )}>
      {children}
      {/* Tail */}
      <svg 
        className={cn(
          "absolute w-6 h-4 fill-[var(--surface-container-lowest)]",
          position === "bottom" && "bottom-0 left-1/2 -translate-x-1/2 translate-y-full rotate-180",
          position === "top" && "top-0 left-1/2 -translate-x-1/2 -translate-y-full",
          position === "left" && "left-0 top-1/2 -translate-y-1/2 -translate-x-full rotate-90",
          position === "right" && "right-0 top-1/2 -translate-y-1/2 translate-x-full -rotate-90"
        )}
        viewBox="0 0 24 16"
      >
        <path d="M12 16L0 0H24L12 16Z" />
      </svg>
    </div>
  );
}
