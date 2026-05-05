'use client';

import { memo } from 'react';

/**
 * Dashboard stat card component
 */
function StatCard({ label, value, icon: Icon, color = 'primary', delay = 0 }) {
  const colorMap = {
    primary: { bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.25)', text: '#818cf8', glow: 'rgba(99, 102, 241, 0.15)' },
    warning: { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.25)', text: '#fbbf24', glow: 'rgba(245, 158, 11, 0.15)' },
    success: { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.25)', text: '#34d399', glow: 'rgba(16, 185, 129, 0.15)' },
    danger: { bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.25)', text: '#f87171', glow: 'rgba(239, 68, 68, 0.15)' },
    accent: { bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.25)', text: '#22d3ee', glow: 'rgba(6, 182, 212, 0.15)' },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <div
      className="glass-card glass-card-hover p-6 animate-fade-in cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">{label}</span>
        {Icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
          >
            <Icon className="w-5 h-5" style={{ color: colors.text }} />
          </div>
        )}
      </div>
      <div className="text-3xl font-bold" style={{ color: colors.text }}>
        {value}
      </div>
    </div>
  );
}

export default memo(StatCard);
