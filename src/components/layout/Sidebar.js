'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROUTES, ROLES } from '@/utils/constants';
import {
  HiOutlineHome,
  HiOutlineCloudArrowUp,
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentCheck,
  HiOutlineRectangleStack,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';
import { MdCastConnected } from 'react-icons/md';

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
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border">
        <Link href={isTeacher ? ROUTES.TEACHER.DASHBOARD : ROUTES.PRINCIPAL.DASHBOARD} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <MdCastConnected className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary">ContentCast</h1>
            <p className="text-[11px] text-text-muted capitalize">{user?.role} Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/15 text-primary-light border border-primary/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-lighter/50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-light' : ''}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-text-primary truncate">{user?.name}</p>
            <p className="text-xs text-text-muted truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-danger hover:bg-danger/10 transition-all duration-200 w-full"
        >
          <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-surface-light border border-border flex items-center justify-center"
        aria-label="Toggle menu"
      >
        {mobileOpen ? (
          <HiOutlineXMark className="w-5 h-5 text-text-primary" />
        ) : (
          <HiOutlineBars3 className="w-5 h-5 text-text-primary" />
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeMobile}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-surface border-r border-border z-30">
        <NavContent />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-surface border-r border-border z-50 flex flex-col transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <NavContent />
      </aside>
    </>
  );
}

export default memo(Sidebar);
