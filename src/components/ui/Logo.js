'use client';

import { memo } from 'react';

/**
 * Custom ContentCast logo — a broadcast tower with signal waves
 * Warm chocolate-gold Japanese-inspired design
 */
function Logo({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Signal waves */}
      <path
        d="M8 8a12 12 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M11 11a7 7 0 0 1 10 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Broadcast dot */}
      <circle cx="16" cy="14" r="2.5" fill="currentColor" />
      {/* Tower body */}
      <path
        d="M16 16.5V22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Tower base */}
      <path
        d="M12 28L16 22L20 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base line */}
      <path
        d="M10 28H22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default memo(Logo);
