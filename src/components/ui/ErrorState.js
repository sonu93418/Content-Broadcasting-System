'use client';

import { memo } from 'react';
import { HiOutlineExclamationTriangle, HiOutlineArrowPath } from 'react-icons/hi2';

function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry = null,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in ${className}`}>
      <div className="w-20 h-20 rounded-2xl bg-danger/10 flex items-center justify-center mb-6">
        <HiOutlineExclamationTriangle className="w-10 h-10 text-danger" />
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Error Occurred</h3>
      <p className="max-w-md mb-6" style={{ color: 'var(--text-secondary)' }}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary flex items-center gap-2">
          <HiOutlineArrowPath className="w-4 h-4" /> Try Again
        </button>
      )}
    </div>
  );
}

export default memo(ErrorState);
