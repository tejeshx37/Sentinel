import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

// Spending breakdown data
const categoryData = [
  { name: 'Fixed Costs', value: 940, color: '#a78bfa', percentage: 40 },
  { name: 'Dining', value: 588, color: '#60a5fa', percentage: 25 },
  { name: 'Commute', value: 352, color: '#34d399', percentage: 15 },
  { name: 'Shopping', value: 235, color: '#fbbf24', percentage: 10 },
  { name: 'Health', value: 235, color: '#f472b6', percentage: 10 },
];

// Budget vs Spending trend data
const trendData = [
  { month: 'Jan', budget: 2400, actual: 2350 },
  { month: 'Feb', budget: 2400, actual: 2580 },
  { month: 'Mar', budget: 2400, actual: 2200 },
  { month: 'Apr', budget: 2400, actual: 2650 },
  { month: 'May', budget: 2400, actual: 2420 },
  { month: 'Jun', budget: 2400, actual: 2350 },
];

// Necessary vs Non-Necessary data
const necessaryData = [
  { category: 'Necessary', amount: 1528, color: '#34d399' },
  { category: 'Non-Necessary', amount: 822, color: '#60a5fa' },
];

// AI-generated insights
const insights = [
  {
    type: 'warning',
    icon: AlertCircle,
    color: '#ffb347',
    text: 'Spending spikes detected on weekends.',
  },
  {
    type: 'risk',
    icon: AlertCircle,
    color: '#ff6b6b',
    text: 'Food expenses exceed safe range by 18%.',
  },
  {
    type: 'safe',
    icon: CheckCircle,
    color: '#34d399',
    text: 'Fixed costs remain consistent month over month.',
  },
  {
    type: 'info',
    icon: TrendingUp,
    color: '#60a5fa',
    text: 'Shopping expenses trending downward—good progress.',
  },
];

// Period comparison data
const periodComparison = [
  { label: 'Total Spending', current: 2350, previous: 2580, change: -8.9 },
  { label: 'Fixed Costs', current: 940, previous: 940, change: 0 },
  { label: 'Variable Costs', current: 1410, previous: 1640, change: -14.0 },
];

export function Insights() {
  return (
    <div className="px-6 space-y-8 pt-8 pb-8">
      {/* Page Title */}
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Insights</h1>
        <p className="text-[13px] text-gray-400 mt-1">
          Understand your patterns, identify risks, and track progress.
        </p>
      </div>

      {/* 1. Spending Breakdown by Category */}
      <div className="space-y-4">
        <h2 className="text-[16px] font-semibold text-gray-300">
          Spending Breakdown by Category
        </h2>
        <div className="bg-[#1a1c20] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-white/5">
          <div className="relative mb-6" style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-[11px] text-gray-500 tracking-widest font-medium">
                TOTAL
              </div>
              <div className="text-[24px] font-bold mt-1">$2,350</div>
            </div>
          </div>

          <div className="space-y-3">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[13px] text-gray-300">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] text-gray-400">{item.percentage}%</span>
                  <span className="text-[13px] font-semibold text-white w-16 text-right">
                    ${item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Budget vs Spending Trend Analysis */}
      <div className="space-y-4">
        <h2 className="text-[16px] font-semibold text-gray-300">
          Budget vs Spending Trend
        </h2>
        <div className="bg-[#1a1c20] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-white/5">
          <div style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2c" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  axisLine={{ stroke: '#2a2a2c' }}
                />
                <YAxis 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  axisLine={{ stroke: '#2a2a2c' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="budget" 
                  stroke="#34d399" 
                  strokeWidth={2}
                  dot={{ fill: '#34d399', r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#ffb347" 
                  strokeWidth={2}
                  dot={{ fill: '#ffb347', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#34d399]" />
              <span className="text-[12px] text-gray-400">Budget</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ffb347]" />
              <span className="text-[12px] text-gray-400">Actual Spending</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Risk & Behavior Insights */}
      <div className="space-y-4">
        <h2 className="text-[16px] font-semibold text-gray-300">
          Risk & Behavior Insights
        </h2>
        <div className="space-y-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="bg-[#1a1c20] rounded-xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-white/5 flex items-start gap-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${insight.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: insight.color }} />
                </div>
                <p className="text-[13px] text-gray-300 leading-relaxed pt-1">
                  {insight.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Necessary vs Non-Necessary Spending */}
      <div className="space-y-4">
        <h2 className="text-[16px] font-semibold text-gray-300">
          Necessary vs Non-Necessary Spending
        </h2>
        <div className="bg-[#1a1c20] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-white/5">
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={necessaryData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2c" opacity={0.3} />
                <XAxis 
                  dataKey="category" 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  axisLine={{ stroke: '#2a2a2c' }}
                />
                <YAxis 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  axisLine={{ stroke: '#2a2a2c' }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  {necessaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {necessaryData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-[11px] text-gray-500 tracking-wide mb-1">
                  {item.category.toUpperCase()}
                </div>
                <div className="text-[20px] font-bold" style={{ color: item.color }}>
                  ${item.amount}
                </div>
                <div className="text-[12px] text-gray-400 mt-1">
                  {Math.round((item.amount / 2350) * 100)}% of total
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Period Comparison */}
      <div className="space-y-4">
        <h2 className="text-[16px] font-semibold text-gray-300">
          This Month vs Last Month
        </h2>
        <div className="bg-[#1a1c20] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-white/5">
          <div className="space-y-4">
            {periodComparison.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <span className="text-[13px] text-gray-400">{item.label}</span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[15px] font-semibold text-white">
                      ${item.current}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      vs ${item.previous}
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1 min-w-[60px] justify-end"
                    style={{ color: item.change < 0 ? '#34d399' : item.change > 0 ? '#ff6b6b' : '#6b7280' }}
                  >
                    {item.change < 0 ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : item.change > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : null}
                    <span className="text-[13px] font-medium">
                      {Math.abs(item.change)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}