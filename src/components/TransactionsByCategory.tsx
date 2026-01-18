import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

const data = [
  { name: 'Fixed Costs', value: 940, color: '#a78bfa' },
  { name: 'Dining', value: 588, color: '#60a5fa' },
  { name: 'Commute', value: 352, color: '#34d399' },
  { name: 'Shopping', value: 235, color: '#fbbf24' },
  { name: 'Health', value: 235, color: '#f472b6' },
];

// Custom active shape renderer for interactive segments
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: `drop-shadow(0 0 12px ${fill}99)`,
        }}
      />
    </g>
  );
};

export function TransactionsByCategory() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Section Title */}
      <h2 className="text-[18px] font-semibold">Transactions by Category</h2>

      {/* Chart Card */}
      <div className="bg-[#1a1c20] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-white/5">
        {/* Donut Chart */}
        <div className="relative mb-6" style={{ width: '100%', height: '220px' }}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-[11px] text-gray-500 tracking-widest font-medium">
              TOTAL SPENT
            </div>
            <div className="text-[28px] font-bold mt-1">$2,350</div>
            <div className="text-[12px] text-gray-400 tracking-wide">
              MONTHLY
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between cursor-pointer transition-opacity hover:opacity-70"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ 
                    backgroundColor: item.color,
                    boxShadow: activeIndex === index ? `0 0 8px ${item.color}` : 'none'
                  }}
                />
                <span className="text-[13px] text-gray-300">{item.name}</span>
              </div>
              <span className="text-[13px] font-semibold text-white">
                ${item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}