"use client";

import { cn } from "@/lib/utils";

type ChickVariant = 
  | "default" 
  | "waving" 
  | "questioning" 
  | "happy" 
  | "crying" 
  | "emergency" 
  | "explaining";

interface HoyaChickProps {
  variant?: ChickVariant;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function HoyaChick({ 
  variant = "default", 
  className,
  size = "md" 
}: HoyaChickProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Emergency siren for emergency variant */}
        {variant === "emergency" && (
          <g className="animate-pulse">
            <ellipse cx="100" cy="30" rx="20" ry="15" fill="#E53935" />
            <rect x="90" y="20" width="20" height="25" rx="4" fill="#EF5350" />
            <circle cx="100" cy="22" r="8" fill="#FFCDD2" />
          </g>
        )}
        
        {/* Question marks for questioning variant */}
        {variant === "questioning" && (
          <>
            <text x="55" y="45" fontSize="20" fill="#745c00" fontWeight="bold">?</text>
            <text x="75" y="30" fontSize="16" fill="#745c00" fontWeight="bold">?</text>
            <text x="120" y="35" fontSize="18" fill="#745c00" fontWeight="bold">?</text>
            <text x="140" y="50" fontSize="14" fill="#745c00" fontWeight="bold">?</text>
          </>
        )}

        {/* Body - egg shape */}
        <ellipse 
          cx="100" 
          cy="110" 
          rx="55" 
          ry="60" 
          fill="#FFF8DC"
          stroke="#36331c"
          strokeWidth="2.5"
        />
        
        {/* Blush circles */}
        <circle cx="65" cy="105" r="10" fill="#FFB6C1" opacity="0.5" />
        <circle cx="135" cy="105" r="10" fill="#FFB6C1" opacity="0.5" />
        
        {/* Eyes */}
        {variant === "crying" ? (
          <>
            {/* Crying eyes - closed with tears */}
            <path d="M75 95 Q80 100 85 95" stroke="#36331c" strokeWidth="2.5" fill="none" />
            <path d="M115 95 Q120 100 125 95" stroke="#36331c" strokeWidth="2.5" fill="none" />
            {/* Tears */}
            <ellipse cx="70" cy="110" rx="4" ry="8" fill="#87CEEB" opacity="0.8" />
            <ellipse cx="130" cy="112" rx="3" ry="6" fill="#87CEEB" opacity="0.8" />
            <ellipse cx="65" cy="125" rx="3" ry="5" fill="#87CEEB" opacity="0.6" />
            <ellipse cx="135" cy="123" rx="2" ry="4" fill="#87CEEB" opacity="0.6" />
          </>
        ) : variant === "happy" ? (
          <>
            {/* Happy eyes - curved lines */}
            <path d="M75 95 Q80 88 85 95" stroke="#36331c" strokeWidth="2.5" fill="none" />
            <path d="M115 95 Q120 88 125 95" stroke="#36331c" strokeWidth="2.5" fill="none" />
          </>
        ) : (
          <>
            {/* Normal eyes */}
            <circle cx="80" cy="95" r="5" fill="#36331c" />
            <circle cx="120" cy="95" r="5" fill="#36331c" />
            {/* Eye highlights */}
            <circle cx="82" cy="93" r="2" fill="white" />
            <circle cx="122" cy="93" r="2" fill="white" />
          </>
        )}
        
        {/* Beak */}
        <path 
          d="M95 110 L100 120 L105 110 Z" 
          fill="#FFA726"
          stroke="#36331c"
          strokeWidth="1.5"
        />
        
        {/* Mouth for different expressions */}
        {variant === "happy" && (
          <path d="M90 125 Q100 135 110 125" stroke="#36331c" strokeWidth="2" fill="none" />
        )}
        {variant === "crying" && (
          <path d="M90 130 Q100 125 110 130" stroke="#36331c" strokeWidth="2" fill="none" />
        )}
        
        {/* Wings */}
        {variant === "waving" ? (
          <>
            {/* Left wing pointing down with motion lines */}
            <ellipse 
              cx="50" 
              cy="120" 
              rx="12" 
              ry="25" 
              fill="#FFF8DC"
              stroke="#36331c"
              strokeWidth="2"
              transform="rotate(-20 50 120)"
            />
            {/* Motion lines */}
            <path d="M35 100 L25 95" stroke="#36331c" strokeWidth="1.5" />
            <path d="M38 110 L28 108" stroke="#36331c" strokeWidth="1.5" />
            <path d="M35 120 L25 122" stroke="#36331c" strokeWidth="1.5" />
            {/* Right wing waving up */}
            <ellipse 
              cx="150" 
              cy="95" 
              rx="12" 
              ry="25" 
              fill="#FFF8DC"
              stroke="#36331c"
              strokeWidth="2"
              transform="rotate(20 150 95)"
            />
          </>
        ) : variant === "questioning" ? (
          <>
            {/* Wings spread out */}
            <ellipse 
              cx="45" 
              cy="110" 
              rx="12" 
              ry="22" 
              fill="#FFF8DC"
              stroke="#36331c"
              strokeWidth="2"
              transform="rotate(-30 45 110)"
            />
            <ellipse 
              cx="155" 
              cy="110" 
              rx="12" 
              ry="22" 
              fill="#FFF8DC"
              stroke="#36331c"
              strokeWidth="2"
              transform="rotate(30 155 110)"
            />
          </>
        ) : variant === "emergency" ? (
          <>
            {/* Wings up near head - holding pose */}
            <ellipse 
              cx="55" 
              cy="80" 
              rx="10" 
              ry="20" 
              fill="#FFF8DC"
              stroke="#36331c"
              strokeWidth="2"
              transform="rotate(-45 55 80)"
            />
            <ellipse 
              cx="145" 
              cy="80" 
              rx="10" 
              ry="20" 
              fill="#FFF8DC"
              stroke="#36331c"
              strokeWidth="2"
              transform="rotate(45 145 80)"
            />
          </>
        ) : (
          <>
            {/* Default wings at sides */}
            <ellipse 
              cx="50" 
              cy="115" 
              rx="10" 
              ry="20" 
              fill="#FFF8DC"
              stroke="#36331c"
              strokeWidth="2"
              transform="rotate(-10 50 115)"
            />
            <ellipse 
              cx="150" 
              cy="115" 
              rx="10" 
              ry="20" 
              fill="#FFF8DC"
              stroke="#36331c"
              strokeWidth="2"
              transform="rotate(10 150 115)"
            />
          </>
        )}
        
        {/* Legs */}
        <line x1="85" y1="165" x2="85" y2="185" stroke="#36331c" strokeWidth="2.5" />
        <line x1="115" y1="165" x2="115" y2="185" stroke="#36331c" strokeWidth="2.5" />
        {/* Feet */}
        <path d="M75 185 L85 185 L95 185" stroke="#36331c" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M105 185 L115 185 L125 185" stroke="#36331c" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
