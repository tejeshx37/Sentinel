import React from 'react';

export function SentinelScore() {
  const progress = 45; // Score out of 100 (changed to 45 to match the image)
  const circumference = 2 * Math.PI * 85; // radius = 85
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Determine color based on score
  const getColorConfig = (score: number) => {
    if (score >= 60) {
      // Safe: Green
      return {
        stroke: '#a8ff9e',
        glow: 'drop-shadow-[0_0_10px_rgba(168,255,158,0.5)]',
        textColor: 'text-[#a8ff9e]',
        textGlow: 'drop-shadow-[0_0_8px_rgba(168,255,158,0.3)]'
      };
    } else if (score >= 20) {
      // Warning: Orange/Amber
      return {
        stroke: '#ffb347',
        glow: 'drop-shadow-[0_0_10px_rgba(255,179,71,0.5)]',
        textColor: 'text-[#ffb347]',
        textGlow: 'drop-shadow-[0_0_8px_rgba(255,179,71,0.3)]'
      };
    } else {
      // Critical: Red
      return {
        stroke: '#ff6b6b',
        glow: 'drop-shadow-[0_0_10px_rgba(255,107,107,0.5)]',
        textColor: 'text-[#ff6b6b]',
        textGlow: 'drop-shadow-[0_0_8px_rgba(255,107,107,0.3)]'
      };
    }
  };

  const colorConfig = getColorConfig(progress);

  return (
    <div className="flex flex-col items-center py-8">
      {/* Ring Chart */}
      <div className="relative w-[220px] h-[220px]">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background ring */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="#1a1a1c"
            strokeWidth="20"
          />
          {/* Progress ring */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke={colorConfig.stroke}
            strokeWidth="20"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={colorConfig.glow}
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[32px] font-bold tracking-tight">45 DAYS</div>
          <div className="text-[11px] text-gray-500 tracking-widest font-medium mt-1">
            TO SHORTFALL
          </div>
        </div>
      </div>

      {/* Sentinel Score Label */}
      <div className="mt-6 flex items-center gap-2">
        <span className="text-[13px] text-gray-400 tracking-wide">
          SENTINEL SCORE:
        </span>
        <span className={`text-[20px] font-bold ${colorConfig.textColor} ${colorConfig.textGlow}`}>
          {progress}
        </span>
      </div>
    </div>
  );
}