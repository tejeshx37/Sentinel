import React from 'react';
import { SentinelScore } from './SentinelScore';
import { SafeDailySpend } from './SafeDailySpend';
import { DailyMissions } from './DailyMissions';
import { TransactionsByCategory } from './TransactionsByCategory';

export function Dashboard() {
  return (
    <div className="px-6 space-y-8 pt-8">
      {/* Sentinel Score Hero */}
      <SentinelScore />

      {/* Safe Daily Spend Card */}
      <SafeDailySpend />

      {/* Daily Missions */}
      <DailyMissions />

      {/* Transactions by Category */}
      <TransactionsByCategory />
    </div>
  );
}
