import React from 'react';
import { Wallet } from 'lucide-react';

export function SafeDailySpend() {
  return (
    <div className="bg-[#1a1c20] rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-white/5">
      <div className="flex items-center justify-between">
        {/* Left: Amount Info */}
        <div className="flex-1">
          <div className="text-[11px] text-gray-500 tracking-wider font-medium mb-2">
            SAFE DAILY SPEND
          </div>
          <div className="text-[32px] font-bold text-[#a8ff9e] leading-none drop-shadow-[0_0_10px_rgba(168,255,158,0.25)]">
            $42.50
          </div>
          <div className="text-[13px] text-gray-400 mt-1.5">
            left for today
          </div>
        </div>

        {/* Right: Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#0f1012] border border-[#a8ff9e]/20 flex items-center justify-center">
          <Wallet className="w-6 h-6 text-[#a8ff9e]" />
        </div>
      </div>
    </div>
  );
}
