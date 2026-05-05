'use client';

import { memo } from 'react';

/**
 * Reusable skeleton loader component
 */
function SkeletonLoader({ type = 'card', count = 1, className = '' }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === 'card') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="skeleton h-4 w-24 mb-4" />
            <div className="skeleton h-8 w-16 mb-2" />
            <div className="skeleton h-3 w-32" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="skeleton h-12 w-full" />
        {skeletons.map((i) => (
          <div key={i} className="skeleton h-16 w-full" style={{ animationDelay: `${i * 50}ms` }} />
        ))}
      </div>
    );
  }

  if (type === 'content-card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="glass-card p-0 overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="skeleton h-48 w-full rounded-none" />
            <div className="p-5 space-y-3">
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-2/3" />
              <div className="flex gap-2 pt-2">
                <div className="skeleton h-6 w-20 rounded-full" />
                <div className="skeleton h-6 w-20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'live') {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="skeleton h-8 w-64 mx-auto" />
        <div className="glass-card p-0 overflow-hidden max-w-4xl mx-auto">
          <div className="skeleton h-80 w-full rounded-none" />
          <div className="p-6 space-y-3">
            <div className="skeleton h-6 w-48" />
            <div className="skeleton h-4 w-32" />
            <div className="skeleton h-3 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Generic line skeleton
  return (
    <div className={`space-y-3 ${className}`}>
      {skeletons.map((i) => (
        <div key={i} className="skeleton h-4 w-full" style={{ animationDelay: `${i * 50}ms` }} />
      ))}
    </div>
  );
}

export default memo(SkeletonLoader);
