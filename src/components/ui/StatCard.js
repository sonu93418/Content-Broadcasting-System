'use client';

import { memo } from 'react';

/**
 * Premium stat card with chocolate-Japanese warm palette
 */
function StatCard({ label, value, icon: Icon, color = 'primary', delay = 0 }) {
  const colorMap = {
    primary: { text: '#c2785c', gradient: 'linear-gradient(135deg, #c2785c, #a0604a)', glow: 'rgba(194,120,92,0.15)' },
    warning: { text: '#d4a853', gradient: 'linear-gradient(135deg, #d4a853, #b88e3a)', glow: 'rgba(212,168,83,0.15)' },
    success: { text: '#6dae7f', gradient: 'linear-gradient(135deg, #6dae7f, #4e9460)', glow: 'rgba(109,174,127,0.15)' },
    danger:  { text: '#c75c5c', gradient: 'linear-gradient(135deg, #c75c5c, #a84848)', glow: 'rgba(199,92,92,0.15)' },
    accent:  { text: '#a68b6b', gradient: 'linear-gradient(135deg, #a68b6b, #8a7256)', glow: 'rgba(166,139,107,0.15)' },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <div
      className="glass-card glass-card-hover p-6 animate-fade-in cursor-default group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
          style={{ background: colors.gradient, boxShadow: `0 4px 12px ${colors.glow}` }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: colors.text, opacity: 0.6 }} />
      </div>

      <div>
        <p className="text-3xl font-extrabold mb-1" style={{ color: colors.text }}>{value}</p>
        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</p>
      </div>

      {/* Subtle bottom accent */}
      <div className="mt-4 h-0.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-lighter)' }}>
        <div
          className="h-full rounded-full transition-all duration-700 group-hover:w-full"
          style={{ background: colors.gradient, width: '50%', opacity: 0.7 }}
        />
      </div>
    </div>
  );
}

export default memo(StatCard);
