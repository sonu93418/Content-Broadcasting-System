'use client';

import { memo } from 'react';

/**
 * Premium 3D dashboard stat card
 */
function StatCard({ label, value, icon: Icon, color = 'primary', delay = 0 }) {
  const colorMap = {
    primary: { bg: 'rgba(232, 121, 160, 0.1)', border: 'rgba(232, 121, 160, 0.2)', text: '#e879a0', glow: 'rgba(232, 121, 160, 0.2)', gradient: 'linear-gradient(135deg, #e879a0, #d45d85)' },
    warning: { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.2)', text: '#fbbf24', glow: 'rgba(251, 191, 36, 0.2)', gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    success: { bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.2)', text: '#34d399', glow: 'rgba(52, 211, 153, 0.2)', gradient: 'linear-gradient(135deg, #34d399, #10b981)' },
    danger: { bg: 'rgba(248, 113, 113, 0.1)', border: 'rgba(248, 113, 113, 0.2)', text: '#f87171', glow: 'rgba(248, 113, 113, 0.2)', gradient: 'linear-gradient(135deg, #f87171, #ef4444)' },
    accent: { bg: 'rgba(192, 132, 252, 0.1)', border: 'rgba(192, 132, 252, 0.2)', text: '#c084fc', glow: 'rgba(192, 132, 252, 0.2)', gradient: 'linear-gradient(135deg, #c084fc, #a855f7)' },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <div
      className="glass-card glass-card-hover p-6 animate-fade-in cursor-default group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{
            background: colors.gradient,
            boxShadow: `0 8px 24px ${colors.glow}, 0 2px 4px rgba(0,0,0,0.2)`,
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: colors.text, boxShadow: `0 0 8px ${colors.glow}` }}
        />
      </div>

      <div>
        <p className="text-3xl font-extrabold mb-1" style={{ color: colors.text }}>
          {value}
        </p>
        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </p>
      </div>

      {/* Decorative bottom bar */}
      <div className="mt-4 h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-lighter)' }}>
        <div
          className="h-full rounded-full transition-all duration-700 group-hover:w-full"
          style={{
            background: colors.gradient,
            width: '60%',
            boxShadow: `0 0 8px ${colors.glow}`,
          }}
        />
      </div>
    </div>
  );
}

export default memo(StatCard);
