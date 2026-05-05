'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { HiXMark } from 'react-icons/hi2';

/**
 * Reusable modal component
 */
function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay for animation
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* Modal Content */}
      <div
        className={`relative ${maxWidth} w-full glass-card p-0 overflow-hidden transition-all duration-300`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-lighter transition-colors"
            aria-label="Close modal"
          >
            <HiXMark className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default memo(Modal);
