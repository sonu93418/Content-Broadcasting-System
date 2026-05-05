'use client';

import { memo } from 'react';
import { HiOutlineInbox } from 'react-icons/hi2';

/**
 * Reusable empty state component
 */
function EmptyState({
  icon: Icon = HiOutlineInbox,
  title = 'No data available',
  description = 'There is nothing to display at the moment.',
  action = null,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in ${className}`}>
      <div className="w-20 h-20 rounded-2xl bg-surface-light flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-text-muted" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary max-w-md mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

export default memo(EmptyState);
