'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/utils/constants';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/components/ui/Logo';
import {
  HiOutlineHome,
  HiOutlineCloudArrowUp,
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentCheck,
  HiOutlineRectangleStack,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowRightOnRectangle,
  HiOutlineSignal,
} from 'react-icons/hi2';

const TEACHER_NAV = [
  { label: 'Dashboard', href: ROUTES.TEACHER.DASHBOARD, icon: HiOutlineHome },
  { label: 'Upload Content', href: ROUTES.TEACHER.UPLOAD, icon: HiOutlineCloudArrowUp },
  { label: 'My Content', href: ROUTES.TEACHER.MY_CONTENT, icon: HiOutlineDocumentText },
];

const PRINCIPAL_NAV = [
  { label: 'Dashboard', href: ROUTES.PRINCIPAL.DASHBOARD, icon: HiOutlineHome },
  { label: 'Pending Approvals', href: ROUTES.PRINCIPAL.PENDING, icon: HiOutlineClipboardDocumentCheck },
  { label: 'All Content', href: ROUTES.PRINCIPAL.ALL_CONTENT, icon: HiOutlineRectangleStack },
];

function Sidebar() {
  const { user, logout, isTeacher } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = isTeacher ? TEACHER_NAV : PRINCIPAL_NAV;
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const NavContent = () => (
    <>
      <div className="px-5 py-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <Link href={isTeacher ? ROUTES.TEACHER.DASHBOARD : ROUTES.PRINCIPAL.DASHBOARD} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white">
            <Logo size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>ContentCast</h1>
            <p className="text-[11px] capitalize" style={{ color: 'var(--text-muted)' }}>{user?.role} Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={closeMobile}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive ? 'bg-primary/12 border border-primary/18' : 'border border-transparent'
              }`}
              style={isActive ? { color: 'var(--color-primary-light)' } : { color: 'var(--text-secondary)' }}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}

        {isTeacher && (
          <Link href={`/live/${user?.id}`} target="_blank" onClick={closeMobile}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent"
            style={{ color: 'var(--text-secondary)' }}
          >
            <HiOutlineSignal className="w-5 h-5" />
            View Live Page
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(194,120,92,0.1)', color: 'var(--color-primary-light)' }}>&#8599;</span>
          </Link>
        )}
      </nav>

      <div className="px-3 py-4" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="flex items-center justify-between px-4 py-2 mb-3 rounded-xl" style={{ background: 'var(--bg-surface-light)' }}>
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Theme</span>
          <ThemeToggle className="!w-8 !h-8 !rounded-lg" />
        </div>

        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{user?.name}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
          </div>
        </div>
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-danger/10 transition-all w-full">
          <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <button onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <HiOutlineXMark className="w-5 h-5" /> : <HiOutlineBars3 className="w-5 h-5" />}
      </button>

      {mobileOpen && <div className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={closeMobile} />}

      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-30" style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-color)' }}>
        <NavContent />
      </aside>

      <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-color)' }}>
        <NavContent />
      </aside>
    </>
  );
}

export default memo(Sidebar);
