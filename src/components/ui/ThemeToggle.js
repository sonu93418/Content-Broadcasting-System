'use client';

import { memo } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) return <div className={`theme-toggle ${className}`} />;

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <HiOutlineSun className="w-5 h-5" />
      ) : (
        <HiOutlineMoon className="w-5 h-5" />
      )}
    </button>
  );
}

export default memo(ThemeToggle);
