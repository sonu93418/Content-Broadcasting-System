'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { HiXMark } from 'react-icons/hi2';

function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className="absolute inset-0 backdrop-blur-sm transition-opacity duration-300" style={{ background: 'var(--overlay-bg)', opacity: visible ? 1 : 0 }} />
      <div
        className={`relative ${maxWidth} w-full glass-card p-0 overflow-hidden transition-all duration-300 max-h-[calc(100vh-2rem)]`}
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)' }}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: 'var(--text-secondary)' }} aria-label="Close modal">
            <HiXMark className="w-5 h-5" />
          </button>
        </div>
        <div className="px-4 py-4 sm:px-6 sm:py-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 8rem)' }}>{children}</div>
      </div>
    </div>
  );
}

export default memo(Modal);
