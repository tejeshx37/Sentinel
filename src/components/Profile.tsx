import React, { useState } from 'react';
import { Trophy, Moon, Sun, MessageSquare, Shield, HelpCircle, ChevronRight, Bell, TrendingDown, BarChart3 } from 'lucide-react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`
        relative w-12 h-7 rounded-full transition-all duration-300
        ${enabled ? 'bg-[#a8ff9e]' : 'bg-[#2a2c30]'}
      `}
      role="switch"
      aria-checked={enabled}
    >
      <div
        className={`
          absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-lg
          ${enabled ? 'left-6' : 'left-1'}
        `}
      />
    </button>
  );
}

export function Profile() {
  const [messagingStyle, setMessagingStyle] = useState<'normal' | 'challenge'>('normal');
  const [darkMode, setDarkMode] = useState(true);
  const [smsAccess, setSmsAccess] = useState(true);
  const [dailyReflection, setDailyReflection] = useState(true);
  const [spendingCapAlerts, setSpendingCapAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  return (
    <div className="px-6 space-y-8 pt-6 pb-8">
      {/* Header Section */}
      <div>
        <h1 className="text-[28px] font-bold tracking-tight leading-tight">Settings</h1>
        <p className="text-[14px] text-gray-400 mt-1.5">
          You're always in control.
        </p>
      </div>

      {/* Current Milestone Card */}
      <div className="bg-gradient-to-br from-[#1a1c20] to-[#141618] rounded-2xl p-5 border border-[#a8ff9e]/20 shadow-[0_4px_24px_rgba(168,255,158,0.12)] relative overflow-hidden">
        {/* Subtle green glow effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#a8ff9e]/5 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-4 relative">
          {/* Trophy Icon */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a8ff9e]/20 to-[#a8ff9e]/10 flex items-center justify-center flex-shrink-0 border border-[#a8ff9e]/20">
            <Trophy className="w-6 h-6 text-[#a8ff9e]" />
          </div>

          {/* Milestone Info */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">
              Current Milestone
            </p>
            <h3 className="text-[16px] font-semibold text-white mb-0.5">
              12 Days Streak
            </h3>
            <p className="text-[13px] text-gray-400">
              Using LifeSaver for 12 days
            </p>
          </div>

          {/* Chevron */}
          <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
        </div>
      </div>

      {/* Messaging Style Selector */}
      <div className="space-y-3">
        <h2 className="text-[12px] font-medium text-gray-500 uppercase tracking-wider">
          Messaging Style
        </h2>

        <div className="bg-[#1a1c20] rounded-full p-1.5 flex gap-1.5">
          <button
            onClick={() => setMessagingStyle('normal')}
            className={`
              flex-1 py-3 px-4 rounded-full text-[14px] font-semibold transition-all duration-300
              ${messagingStyle === 'normal'
                ? 'bg-[#a8ff9e] text-[#0a0a0b] shadow-[0_4px_16px_rgba(168,255,158,0.3)]'
                : 'bg-transparent text-gray-400 hover:text-gray-300'
              }
            `}
          >
            Normal Mode
          </button>
          <button
            onClick={() => setMessagingStyle('challenge')}
            className={`
              flex-1 py-3 px-4 rounded-full text-[14px] font-semibold transition-all duration-300
              ${messagingStyle === 'challenge'
                ? 'bg-[#a8ff9e] text-[#0a0a0b] shadow-[0_4px_16px_rgba(168,255,158,0.3)]'
                : 'bg-transparent text-gray-400 hover:text-gray-300'
              }
            `}
          >
            Challenge Mode
          </button>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="space-y-3">
        <h2 className="text-[12px] font-medium text-gray-500 uppercase tracking-wider">
          Appearance
        </h2>

        <div className="bg-[#1a1c20] rounded-2xl overflow-hidden border border-white/5">
          {/* Dark Mode */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#a8ff9e]/10 flex items-center justify-center">
                <Moon className="w-4.5 h-4.5 text-[#a8ff9e]" />
              </div>
              <span className="text-[15px] font-semibold text-white">
                Dark Mode
              </span>
            </div>
            <ToggleSwitch enabled={darkMode} onChange={setDarkMode} />
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 mx-5" />

          {/* Light Mode */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                <Sun className="w-4.5 h-4.5 text-gray-500" />
              </div>
              <span className="text-[15px] font-semibold text-gray-400">
                Light Mode
              </span>
            </div>
            <ToggleSwitch enabled={!darkMode} onChange={(val) => setDarkMode(!val)} />
          </div>
        </div>
      </div>

      {/* Privacy Controls Section */}
      <div className="space-y-3">
        <h2 className="text-[12px] font-medium text-gray-500 uppercase tracking-wider">
          Privacy Controls
        </h2>

        {/* SMS Access Card */}
        <div className="bg-[#1a1c20] rounded-2xl p-5 border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5 flex-1">
              <div className="w-9 h-9 rounded-full bg-[#a8ff9e]/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4.5 h-4.5 text-[#a8ff9e]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-white mb-0.5">
                  SMS Access
                </h3>
                <p className="text-[13px] text-gray-400">
                  Auto-read financial alerts
                </p>
              </div>
            </div>
            <ToggleSwitch enabled={smsAccess} onChange={setSmsAccess} />
          </div>
        </div>

        {/* Delete All Data Button */}
        <button className="w-full py-4 rounded-2xl border-2 border-[#a8ff9e] bg-transparent text-[#a8ff9e] text-[15px] font-semibold hover:bg-[#a8ff9e]/5 transition-all duration-300 active:scale-[0.98]">
          Delete All Data
        </button>
      </div>

      {/* Alerts & Reminders Section */}
      <div className="space-y-3">
        <h2 className="text-[12px] font-medium text-gray-500 uppercase tracking-wider">
          Alerts & Reminders
        </h2>

        <div className="bg-[#1a1c20] rounded-2xl overflow-hidden border border-white/5">
          {/* Daily Reflection */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${dailyReflection ? 'bg-[#a8ff9e]/10' : 'bg-white/5'}`}>
                <Bell className={`w-4.5 h-4.5 ${dailyReflection ? 'text-[#a8ff9e]' : 'text-gray-500'}`} />
              </div>
              <span className={`text-[15px] font-semibold ${dailyReflection ? 'text-white' : 'text-gray-400'}`}>
                Daily Reflection
              </span>
            </div>
            <ToggleSwitch enabled={dailyReflection} onChange={setDailyReflection} />
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 mx-5" />

          {/* Spending Cap Alerts */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${spendingCapAlerts ? 'bg-[#a8ff9e]/10' : 'bg-white/5'}`}>
                <TrendingDown className={`w-4.5 h-4.5 ${spendingCapAlerts ? 'text-[#a8ff9e]' : 'text-gray-500'}`} />
              </div>
              <span className={`text-[15px] font-semibold ${spendingCapAlerts ? 'text-white' : 'text-gray-400'}`}>
                Spending Cap Alerts
              </span>
            </div>
            <ToggleSwitch enabled={spendingCapAlerts} onChange={setSpendingCapAlerts} />
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 mx-5" />

          {/* Weekly Summary */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${weeklySummary ? 'bg-[#a8ff9e]/10' : 'bg-white/5'}`}>
                <BarChart3 className={`w-4.5 h-4.5 ${weeklySummary ? 'text-[#a8ff9e]' : 'text-gray-500'}`} />
              </div>
              <span className={`text-[15px] font-semibold ${weeklySummary ? 'text-white' : 'text-gray-400'}`}>
                Weekly Summary
              </span>
            </div>
            <ToggleSwitch enabled={weeklySummary} onChange={setWeeklySummary} />
          </div>
        </div>
      </div>

      {/* Help & Ethics Section */}
      <div className="space-y-3">
        <h2 className="text-[12px] font-medium text-gray-500 uppercase tracking-wider">
          Help & Ethics
        </h2>

        <div className="bg-[#1a1c20] rounded-2xl overflow-hidden border border-white/5">
          {/* Ethical Data Usage */}
          <button className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors active:scale-[0.99]">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                <Shield className="w-4.5 h-4.5 text-gray-400" />
              </div>
              <span className="text-[15px] font-semibold text-white">
                Ethical Data Usage
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>

          {/* Divider */}
          <div className="h-px bg-white/5 mx-5" />

          {/* Support Center */}
          <button className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors active:scale-[0.99]">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                <HelpCircle className="w-4.5 h-4.5 text-gray-400" />
              </div>
              <span className="text-[15px] font-semibold text-white">
                Support Center
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* App Version Footer */}
      <div className="text-center pt-4 pb-2">
        <p className="text-[12px] text-gray-600">
          LifeSaver v1.2.0
        </p>
        <p className="text-[11px] text-gray-700 mt-1">
          Built with mindfulness & care
        </p>
      </div>
    </div>
  );
}
