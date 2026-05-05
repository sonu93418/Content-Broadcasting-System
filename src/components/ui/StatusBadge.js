'use client';

import { memo } from 'react';
import { getStatusClass } from '@/utils/helpers';

/**
 * Reusable status badge component
 */
function StatusBadge({ status, className = '' }) {
  const displayText = status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown';
  const statusClass = getStatusClass(status);

  return (
    <span className={`status-badge ${statusClass} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {displayText}
    </span>
  );
}

export default memo(StatusBadge);
