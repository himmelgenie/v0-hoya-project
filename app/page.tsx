"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { HomeScreen } from "@/components/screens/home-screen";
import { SearchScreen } from "@/components/screens/search-screen";
import { PainLevelScreen } from "@/components/screens/pain-level-screen";
import { EmergencyScreen } from "@/components/screens/emergency-screen";
import { ChatScreen } from "@/components/screens/chat-screen";

type Screen = "home" | "search" | "pain-level" | "emergency" | "chat";
type Tab = "home" | "search" | "emergency";

interface ScreenData {
  medicine?: string;
  category?: string;
}

export default function HoYaApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [screenData, setScreenData] = useState<ScreenData>({});
  const [screenHistory, setScreenHistory] = useState<Screen[]>(["home"]);

  const navigateTo = useCallback((screen: string, data?: Record<string, string>) => {
    const newScreen = screen as Screen;
    setScreenHistory(prev => [...prev, newScreen]);
    setCurrentScreen(newScreen);
    if (data) {
      setScreenData(data);
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
    setScreenHistory([tab]);
    setCurrentScreen(tab);
    setScreenData({});
  }, []);

  const getCurrentTab = (): Tab => {
    if (currentScreen === "emergency") return "emergency";
    if (currentScreen === "search" || currentScreen === "chat") return "search";
    return "home";
  };

  const shouldShowHeader = currentScreen !== "chat";
  const shouldShowNav = currentScreen !== "chat";

  const getHeaderTitle = () => {
    switch (currentScreen) {
      case "home":
        return "Ho-YA!!";
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
            showBack={currentScreen !== "home" && currentScreen !== "search" && currentScreen !== "emergency"}
            onBack={goBack}
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
          
          {currentScreen === "emergency" && (
            <EmergencyScreen />
          )}
          
          {currentScreen === "chat" && (
            <ChatScreen 
              medicine={screenData.medicine} 
              category={screenData.category}
              onMenuClick={goBack}
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
      </div>
    </div>
  );
}
