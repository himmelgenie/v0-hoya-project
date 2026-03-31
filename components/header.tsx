"use client";

import { ArrowLeft, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showHelp?: boolean;
  onBack?: () => void;
  onHelp?: () => void;
  className?: string;
}

export function Header({ 
  title = "Ho-YA", 
  showBack = false, 
  showHelp = true,
  onBack,
  onHelp,
  className 
}: HeaderProps) {
  return (
    <header className={cn(
      "sticky top-0 z-50 glassmorphism",
      className
    )}>
      <div className="max-w-md mx-auto flex items-center justify-between h-14 px-4">
        {/* Left - Back button or spacer */}
        <div className="w-10 h-10 flex items-center justify-center">
          {showBack ? (
            <button 
              onClick={onBack}
              className="p-2 rounded-full touch-scale hover:bg-[var(--surface-container-high)] transition-colors"
              aria-label="뒤로 가기"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--foreground)]" />
            </button>
          ) : null}
        </div>

        {/* Center - Title */}
        <h1 className="text-xl font-bold text-[var(--foreground)] tracking-tight">
          {title}
        </h1>

        {/* Right - Help button */}
        <div className="w-10 h-10 flex items-center justify-center">
          {showHelp && (
            <button 
              onClick={onHelp}
              className="p-2 rounded-full bg-[var(--primary)] touch-scale transition-colors"
              aria-label="도움말"
            >
              <HelpCircle className="w-5 h-5 text-[var(--primary-foreground)]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
