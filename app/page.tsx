"use client";

import { useState, useCallback, useEffect } from "react";
import { X, Phone } from "lucide-react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { HomeScreen } from "@/components/screens/home-screen";
import { SearchScreen } from "@/components/screens/search-screen";
import { PainLevelScreen } from "@/components/screens/pain-level-screen";
import { EmergencyScreen } from "@/components/screens/emergency-screen";
import { ChatScreen } from "@/components/screens/chat-screen";
import { SymptomScreen } from "@/components/screens/symptom-screen";
import {
  loadConversations,
  formatRelativeDate,
  type StoredConversation,
} from "@/lib/conversation-history";

const mockProfile = {
  name: "도연",
  age: "7",
  gender: "여",
  parentPhone: "010-1234-5678",
};

type Screen = "home" | "search" | "pain-level" | "emergency" | "chat" | "symptom";
type Tab = "home" | "search" | "emergency";

interface ScreenData {
  medicine?: string;
  category?: string;
  symptom?: string;
  conversationId?: string;
}

export default function HoYaApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("pain-level");
  const [screenData, setScreenData] = useState<ScreenData>({});
  const [screenHistory, setScreenHistory] = useState<Screen[]>(["pain-level"]);
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [conversations, setConversations] = useState<StoredConversation[]>([]);

  useEffect(() => {
    if (showSidebar) {
      setConversations(loadConversations());
    }
  }, [showSidebar]);

  const navigateTo = useCallback((screen: string, data?: Record<string, unknown>) => {
    const newScreen = screen as Screen;
    setScreenHistory(prev => [...prev, newScreen]);
    setCurrentScreen(newScreen);
    if (data) {
      setScreenData(data as ScreenData);
    }
  }, []);

  const goBack = useCallback(() => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      setScreenHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    }
  }, [screenHistory]);

  const handleTabChange = useCallback((tab: Tab) => {
    if (tab === "home") {
      setScreenHistory(["pain-level"]);
      setCurrentScreen("pain-level");
    } else {
      setScreenHistory([tab]);
      setCurrentScreen(tab);
    }
    setScreenData({});
  }, []);

  const getCurrentTab = (): Tab => {
    if (currentScreen === "emergency") return "emergency";
    if (currentScreen === "search" || currentScreen === "chat") return "search";
    return "home";
  };

  const isInitialScreen = currentScreen === "pain-level" || currentScreen === "search" || currentScreen === "emergency" || currentScreen === "symptom";

  const shouldShowHeader = currentScreen !== "chat";
  const shouldShowNav = currentScreen !== "chat";

  const getHeaderTitle = () => {
    switch (currentScreen) {
      case "home":
        return "Ho-YA";
      case "emergency":
        return "Ho-YA";
      default:
        return "Ho-YA";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile container */}
      <div className="max-w-md mx-auto min-h-screen relative">
        {/* Header */}
        {shouldShowHeader && (
          <Header
            title={getHeaderTitle()}
            showBack={!isInitialScreen}
            onBack={goBack}
            onHelp={() => setShowProfile(true)}
            onMenu={() => setShowSidebar(true)}
          />
        )}

        {/* Main content */}
        <main className="relative">
          {currentScreen === "home" && (
            <HomeScreen onNavigate={navigateTo} />
          )}
          
          {currentScreen === "search" && (
            <SearchScreen onNavigate={navigateTo} />
          )}
          
          {currentScreen === "pain-level" && (
            <PainLevelScreen onNavigate={navigateTo} />
          )}
          
          {currentScreen === "symptom" && (
            <SymptomScreen onNavigate={navigateTo} />
          )}
          
          {currentScreen === "emergency" && (
            <EmergencyScreen />
          )}
          
          {currentScreen === "chat" && (
            <ChatScreen
              medicine={screenData.medicine}
              category={screenData.category}
              conversationId={screenData.conversationId}
              onNavigate={navigateTo}
            />
          )}
        </main>

        {/* Bottom navigation */}
        {shouldShowNav && (
          <BottomNav
            activeTab={getCurrentTab()}
            onTabChange={handleTabChange}
          />
        )}

        {/* Profile modal */}
        {showProfile && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowProfile(false)}
          >
            <div
              className="relative bg-white rounded-3xl w-72 px-6 py-8 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full border-4 border-[var(--primary)] overflow-hidden mb-3 bg-[var(--primary-container)] flex items-center justify-center">
                <img
                  src="/images/chick_default.png"
                  alt="프로필"
                  className="w-16 h-16 object-contain"
                />
              </div>

              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">{mockProfile.name}</h2>

              <div className="w-full space-y-2 mb-6">
                <div className="flex items-center justify-between bg-[var(--surface-container-high)] rounded-2xl px-4 py-3">
                  <span className="text-sm font-medium text-[var(--muted-foreground)]">나이:</span>
                  <span className="text-sm font-semibold text-[var(--foreground)]">{mockProfile.age}세</span>
                </div>
                <div className="flex items-center justify-between bg-[var(--surface-container-high)] rounded-2xl px-4 py-3">
                  <span className="text-sm font-medium text-[var(--muted-foreground)]">성별:</span>
                  <span className="text-sm font-semibold text-[var(--foreground)]">{mockProfile.gender}</span>
                </div>
                <div className="flex items-center gap-2 bg-[var(--primary-container)] rounded-2xl px-4 py-3">
                  <Phone className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm font-bold text-[var(--primary)]">{mockProfile.parentPhone}</span>
                </div>
              </div>

              <button
                onClick={() => setShowProfile(false)}
                className="w-full py-3 rounded-full bg-[var(--primary)] text-white font-bold text-base touch-scale transition-all"
              >
                확인
              </button>
            </div>
          </div>
        )}

        {/* Conversation history sidebar */}
        {showSidebar && (
          <div
            className="fixed inset-0 z-50 flex"
            onClick={() => setShowSidebar(false)}
          >
            {/* Sidebar panel */}
            <div
              className="w-72 h-full bg-white flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-5 pt-12 pb-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[var(--foreground)]">대화 기록</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Profile summary */}
              <div className="flex items-center gap-3 px-5 py-4 bg-[var(--surface-container-high)] mx-4 mt-4 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-[var(--primary-container)] flex items-center justify-center overflow-hidden">
                  <img src="/images/chick_default.png" alt="프로필" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--foreground)]">{mockProfile.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{mockProfile.age}세 · {mockProfile.gender}</p>
                </div>
              </div>

              {/* Conversations list */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                {conversations.length === 0 ? (
                  <p className="text-sm text-[var(--muted-foreground)] text-center mt-8 px-4">
                    아직 검색한 약이 없어요.<br />
                    "새 검색"으로 시작해보세요!
                  </p>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      className="w-full text-left px-4 py-3 rounded-2xl hover:bg-[var(--surface-container-high)] transition-colors group"
                      onClick={() => {
                        setShowSidebar(false);
                        navigateTo("chat", { medicine: conv.medicine, conversationId: conv.id });
                      }}
                    >
                      <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
                        {conv.medicine}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {formatRelativeDate(conv.updatedAt)}
                      </p>
                    </button>
                  ))
                )}
              </div>

              {/* New chat button */}
              <div className="px-4 pb-8 pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowSidebar(false);
                    navigateTo("search");
                  }}
                  className="w-full py-3 rounded-full bg-[var(--primary)] text-white font-bold text-sm touch-scale transition-all"
                >
                  + 새 검색
                </button>
              </div>
            </div>

            {/* Dim overlay */}
            <div className="flex-1 bg-black/40" />
          </div>
        )}
      </div>
    </div>
  );
}
