"use client";

import { Home, Search, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: "home" | "search" | "emergency";
  onTabChange: (tab: "home" | "search" | "emergency") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glassmorphism border-t-0 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around h-20 px-6">
        {/* Home */}
        <button
          onClick={() => onTabChange("home")}
          className={cn(
            "flex flex-col items-center gap-1 p-3 rounded-2xl transition-all touch-scale",
            activeTab === "home" 
              ? "text-[var(--primary)]" 
              : "text-[var(--muted-foreground)]"
          )}
          aria-label="홈"
        >
          <Home className="w-6 h-6" strokeWidth={activeTab === "home" ? 2.5 : 2} />
        </button>

        {/* Search - Center button with accent */}
        <button
          onClick={() => onTabChange("search")}
          className={cn(
            "flex items-center justify-center w-14 h-14 rounded-full transition-all touch-scale -mt-6",
            activeTab === "search"
              ? "bg-[var(--primary-fixed)] shadow-lg"
              : "bg-[var(--primary-fixed)]"
          )}
          aria-label="약 검색"
        >
          <Search className="w-6 h-6 text-[var(--foreground)]" strokeWidth={2.5} />
        </button>

        {/* Emergency */}
        <button
          onClick={() => onTabChange("emergency")}
          className={cn(
            "flex flex-col items-center gap-1 p-3 rounded-2xl transition-all touch-scale",
            activeTab === "emergency" 
              ? "text-[var(--primary)]" 
              : "text-[var(--muted-foreground)]"
          )}
          aria-label="응급 상황"
        >
          <AlertTriangle className="w-6 h-6" strokeWidth={activeTab === "emergency" ? 2.5 : 2} />
        </button>
      </div>
    </nav>
  );
}
