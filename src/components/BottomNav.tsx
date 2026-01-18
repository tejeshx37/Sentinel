import React from 'react';
import { Home, TrendingUp, MessageCircle, Target, User } from 'lucide-react';

interface BottomNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
  { id: 'ai-chat', label: 'AI Chat', icon: MessageCircle, emphasized: true },
  { id: 'missions', label: 'Missions', icon: Target },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ activePage, onNavigate }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-white/5 pb-6">
      <div className="flex items-end justify-around px-4 pt-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          const isEmphasized = item.emphasized;

          return (
            <button
              key={item.id}
              className="flex flex-col items-center gap-1 relative group"
              onClick={() => onNavigate(item.id)}
            >
              {/* Icon Container */}
              <div
                className={`
                  flex items-center justify-center rounded-full transition-all
                  ${isEmphasized ? 'w-14 h-14 -mt-2' : 'w-10 h-10'}
                  ${isEmphasized && 'bg-[#a8ff9e]/10 shadow-[0_0_20px_rgba(168,255,158,0.2)]'}
                `}
              >
                <Icon
                  className={`
                    transition-colors
                    ${isActive ? 'text-[#a8ff9e]' : 'text-gray-500'}
                    ${isEmphasized ? 'w-7 h-7' : 'w-5 h-5'}
                  `}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && !isEmphasized && (
                  <div className="absolute inset-0 rounded-full bg-[#a8ff9e]/10 blur-sm" />
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  text-[11px] font-medium transition-colors
                  ${isActive ? 'text-[#a8ff9e]' : 'text-gray-500'}
                `}
              >
                {item.label}
              </span>

              {/* Active Indicator Glow */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#a8ff9e] rounded-full shadow-[0_0_8px_rgba(168,255,158,0.6)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}