import React, { useState } from 'react';
import { CheckCircle, Circle, Flame, Trophy, Lock, Unlock, Star, Gift, Zap, Target, TrendingUp } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  progress?: number;
  maxProgress?: number;
}

interface CompletedMission {
  id: string;
  title: string;
  points: number;
  completedDate: Date;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  unlocked: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export function Missions() {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [totalPoints, setTotalPoints] = useState(485);
  const [longestStreak, setLongestStreak] = useState(23);

  const [activeMissions, setActiveMissions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Stay Under Budget',
      description: 'Keep your daily spending below $82',
      points: 25,
      completed: false,
      progress: 1,
      maxProgress: 1,
    },
    {
      id: '2',
      title: 'Log All Transactions',
      description: 'Record at least 3 transactions today',
      points: 15,
      completed: false,
      progress: 2,
      maxProgress: 3,
    },
    {
      id: '3',
      title: 'Save for Emergency',
      description: 'Add $50 to your emergency fund',
      points: 50,
      completed: false,
      progress: 35,
      maxProgress: 50,
    },
    {
      id: '4',
      title: 'Review Subscriptions',
      description: 'Identify and cancel unused subscriptions',
      points: 40,
      completed: false,
    },
  ]);

  const [completedMissions, setCompletedMissions] = useState<CompletedMission[]>([
    {
      id: 'c1',
      title: 'Daily Budget Check',
      points: 25,
      completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'c2',
      title: 'Weekly Spending Review',
      points: 35,
      completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'c3',
      title: 'Set Savings Goal',
      points: 30,
      completedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'c4',
      title: 'No Non-Essential Spending',
      points: 40,
      completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'c5',
      title: 'Connect Bank Account',
      points: 20,
      completedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ]);

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: 'r1',
      title: 'Budget Master Badge',
      description: 'Unlock advanced budgeting tools',
      pointsRequired: 100,
      unlocked: true,
      icon: Trophy,
    },
    {
      id: 'r2',
      title: 'AI Spending Insights',
      description: 'Get personalized spending recommendations',
      pointsRequired: 250,
      unlocked: true,
      icon: Zap,
    },
    {
      id: 'r3',
      title: 'Custom Categories',
      description: 'Create your own expense categories',
      pointsRequired: 400,
      unlocked: true,
      icon: Target,
    },
    {
      id: 'r4',
      title: 'Premium Analytics',
      description: 'Access detailed financial reports',
      pointsRequired: 500,
      unlocked: false,
      icon: TrendingUp,
    },
    {
      id: 'r5',
      title: 'Financial Coach Access',
      description: '1-on-1 session with a financial advisor',
      pointsRequired: 750,
      unlocked: false,
      icon: Star,
    },
    {
      id: 'r6',
      title: 'Platinum Status',
      description: 'Unlock all premium features',
      pointsRequired: 1000,
      unlocked: false,
      icon: Gift,
    },
  ]);

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const completeMission = (missionId: string) => {
    const mission = activeMissions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    // Update mission to completed
    setActiveMissions(prev => 
      prev.map(m => m.id === missionId ? { ...m, completed: true } : m)
    );

    // Add to completed missions
    setCompletedMissions(prev => [{
      id: `c${Date.now()}`,
      title: mission.title,
      points: mission.points,
      completedDate: new Date(),
    }, ...prev]);

    // Add points
    setTotalPoints(prev => prev + mission.points);
  };

  return (
    <div className="px-6 space-y-6 pt-6 pb-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Missions & Rewards</h1>
        <p className="text-[13px] text-gray-400 mt-1">
          Complete missions, earn points, unlock rewards
        </p>
      </div>

      {/* Streak & Points Overview */}
      <div className="grid grid-cols-2 gap-3">
        {/* Current Streak */}
        <div className="bg-gradient-to-br from-[#ff6b35]/10 to-[#ff6b35]/5 rounded-2xl p-5 border border-[#ff6b35]/20 shadow-[0_4px_24px_rgba(255,107,53,0.15)]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#ff6b35]/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#ff6b35]" />
            </div>
            <span className="text-[11px] text-gray-400 uppercase tracking-wider">Current Streak</span>
          </div>
          <div className="text-[32px] font-bold text-[#ff6b35] leading-none mb-1">
            {currentStreak}
          </div>
          <div className="text-[11px] text-gray-500">
            Best: {longestStreak} days
          </div>
        </div>

        {/* Total Points */}
        <div className="bg-gradient-to-br from-[#a8ff9e]/10 to-[#a8ff9e]/5 rounded-2xl p-5 border border-[#a8ff9e]/20 shadow-[0_4px_24px_rgba(168,255,158,0.15)]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#a8ff9e]/20 flex items-center justify-center">
              <Star className="w-4 h-4 text-[#a8ff9e]" />
            </div>
            <span className="text-[11px] text-gray-400 uppercase tracking-wider">Total Points</span>
          </div>
          <div className="text-[32px] font-bold text-[#a8ff9e] leading-none mb-1">
            {totalPoints}
          </div>
          <div className="text-[11px] text-gray-500">
            Lifetime earned
          </div>
        </div>
      </div>

      {/* Active Missions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold">Today's Missions</h2>
          <span className="text-[12px] text-gray-500">
            {activeMissions.filter(m => m.completed).length}/{activeMissions.length} completed
          </span>
        </div>

        <div className="space-y-3">
          {activeMissions.map((mission) => (
            <div
              key={mission.id}
              className={`
                bg-[#1a1c20] rounded-2xl p-5 border transition-all
                ${mission.completed 
                  ? 'border-[#a8ff9e]/30 shadow-[0_4px_24px_rgba(168,255,158,0.1)]' 
                  : 'border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
                }
              `}
            >
              <div className="flex items-start gap-4">
                {/* Completion Icon */}
                <button
                  onClick={() => !mission.completed && completeMission(mission.id)}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                    ${mission.completed
                      ? 'bg-[#a8ff9e]/20 cursor-default'
                      : 'bg-white/5 hover:bg-white/10 cursor-pointer'
                    }
                  `}
                >
                  {mission.completed ? (
                    <CheckCircle className="w-5 h-5 text-[#a8ff9e]" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {/* Mission Details */}
                <div className="flex-1 min-w-0">
                  <h3 className={`
                    text-[15px] font-semibold mb-1
                    ${mission.completed ? 'text-gray-500 line-through' : 'text-white'}
                  `}>
                    {mission.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 mb-3">
                    {mission.description}
                  </p>

                  {/* Progress Bar */}
                  {mission.maxProgress && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-gray-500">Progress</span>
                        <span className="text-[11px] text-gray-400">
                          {mission.progress}/{mission.maxProgress}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#a8ff9e] to-[#34d399] rounded-full transition-all duration-500"
                          style={{ width: `${((mission.progress || 0) / mission.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Points Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#a8ff9e]/10 rounded-full border border-[#a8ff9e]/20">
                    <Star className="w-3 h-3 text-[#a8ff9e]" />
                    <span className="text-[12px] font-semibold text-[#a8ff9e]">
                      {mission.points} points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlockable Rewards */}
      <div className="space-y-4">
        <h2 className="text-[18px] font-semibold">Unlockable Rewards</h2>

        <div className="space-y-3">
          {rewards.map((reward) => {
            const Icon = reward.icon;
            const canUnlock = totalPoints >= reward.pointsRequired;

            return (
              <div
                key={reward.id}
                className={`
                  bg-[#1a1c20] rounded-2xl p-5 border transition-all
                  ${reward.unlocked
                    ? 'border-[#a8ff9e]/30 shadow-[0_4px_24px_rgba(168,255,158,0.1)]'
                    : canUnlock
                    ? 'border-yellow-500/30 shadow-[0_4px_24px_rgba(234,179,8,0.1)]'
                    : 'border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${reward.unlocked
                        ? 'bg-[#a8ff9e]/20'
                        : canUnlock
                        ? 'bg-yellow-500/20'
                        : 'bg-white/5'
                      }
                    `}
                  >
                    <Icon
                      className={`
                        w-6 h-6
                        ${reward.unlocked
                          ? 'text-[#a8ff9e]'
                          : canUnlock
                          ? 'text-yellow-500'
                          : 'text-gray-600'
                        }
                      `}
                    />
                  </div>

                  {/* Reward Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className={`
                        text-[15px] font-semibold
                        ${reward.unlocked ? 'text-[#a8ff9e]' : 'text-white'}
                      `}>
                        {reward.title}
                      </h3>
                      {reward.unlocked ? (
                        <div className="flex items-center gap-1 px-2 py-1 bg-[#a8ff9e]/20 rounded-lg">
                          <Unlock className="w-3 h-3 text-[#a8ff9e]" />
                          <span className="text-[10px] font-semibold text-[#a8ff9e] uppercase">
                            Unlocked
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg">
                          <Lock className="w-3 h-3 text-gray-500" />
                        </div>
                      )}
                    </div>

                    <p className="text-[13px] text-gray-400 mb-3">
                      {reward.description}
                    </p>

                    {/* Points Required */}
                    {!reward.unlocked && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-500">
                            {totalPoints} / {reward.pointsRequired} points
                          </span>
                          <span className={`
                            text-[11px] font-medium
                            ${canUnlock ? 'text-yellow-500' : 'text-gray-500'}
                          `}>
                            {canUnlock 
                              ? 'Ready to unlock!' 
                              : `${reward.pointsRequired - totalPoints} more needed`
                            }
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`
                              h-full rounded-full transition-all duration-500
                              ${canUnlock
                                ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                                : 'bg-gradient-to-r from-gray-600 to-gray-700'
                              }
                            `}
                            style={{ 
                              width: `${Math.min((totalPoints / reward.pointsRequired) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Completed Missions */}
      <div className="space-y-4">
        <h2 className="text-[18px] font-semibold">Recently Completed</h2>

        <div className="bg-[#1a1c20] rounded-2xl p-5 border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <div className="space-y-3">
            {completedMissions.slice(0, 5).map((mission, index) => (
              <div
                key={mission.id}
                className={`
                  flex items-center justify-between py-3
                  ${index !== completedMissions.slice(0, 5).length - 1 ? 'border-b border-white/5' : ''}
                `}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <CheckCircle className="w-4 h-4 text-[#a8ff9e] flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[14px] text-gray-300 truncate">
                      {mission.title}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {formatDate(mission.completedDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#a8ff9e] flex-shrink-0 ml-3">
                  <span className="text-[13px] font-semibold">+{mission.points}</span>
                  <Star className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>

          {completedMissions.length > 5 && (
            <button className="w-full mt-4 py-2.5 text-[13px] text-gray-400 hover:text-[#a8ff9e] transition-colors">
              View all {completedMissions.length} completed missions
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
