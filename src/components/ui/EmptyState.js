'use client';

import { memo } from 'react';
import { HiOutlineInbox } from 'react-icons/hi2';

function EmptyState({
  icon: Icon = HiOutlineInbox,
  title = 'No data available',
  description = 'There is nothing to display at the moment.',
  action = null,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in ${className}`}>
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--bg-surface-light)' }}>
        <Icon className="w-10 h-10" style={{ color: 'var(--text-muted)' }} />
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="max-w-md mb-6" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

export default memo(EmptyState);
