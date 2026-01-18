import React from 'react';
import { Flame, FileText, ChevronRight, Award } from 'lucide-react';

export function DailyMissions() {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold">Daily Missions</h2>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-[11px] font-semibold text-orange-300 tracking-wide">
            7 DAY STREAK
          </span>
        </div>
      </div>

      {/* Main Mission Card */}
      <div className="bg-[#1a1c20] rounded-2xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-white/5">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-white/95 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-gray-800" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-semibold text-white mb-0.5">
              Review Subscriptions
            </div>
            <div className="text-[13px] text-gray-400">
              Estimated savings: $15/mo
            </div>
          </div>

          {/* Start Button */}
          <button className="px-5 py-2 rounded-lg bg-[#a8ff9e] text-black text-[13px] font-semibold hover:bg-[#95eb8b] transition-colors shadow-[0_0_16px_rgba(168,255,158,0.3)]">
            START
          </button>
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center justify-between gap-3">
        <button className="flex items-center gap-1 text-[13px] text-gray-400 hover:text-gray-300 transition-colors">
          <span>Pick another task</span>
          <ChevronRight className="w-4 h-4" />
        </button>
        <button className="px-4 py-2 rounded-lg bg-[#1a1c20] border border-white/10 text-[13px] font-semibold text-white hover:bg-[#22242a] transition-colors flex items-center gap-2">
          <Award className="w-4 h-4" />
          MY REWARDS
        </button>
      </div>
    </div>
  );
}
