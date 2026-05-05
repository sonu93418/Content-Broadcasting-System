'use client';

import { useEffect, useState, memo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROUTES, ROLES } from '@/utils/constants';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

/**
 * Protected route wrapper - redirects unauthenticated users
 * and enforces role-based access control
 */
function ProtectedRoute({ children, allowedRole }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (allowedRole && user?.role !== allowedRole) {
      // Redirect to correct dashboard
      if (user?.role === ROLES.TEACHER) {
        router.replace(ROUTES.TEACHER.DASHBOARD);
      } else if (user?.role === ROLES.PRINCIPAL) {
        router.replace(ROUTES.PRINCIPAL.DASHBOARD);
      } else {
        router.replace(ROUTES.LOGIN);
      }
      return;
    }

    setAuthorized(true);
  }, [loading, isAuthenticated, user, allowedRole, router, pathname]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070d1a]">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
}

export default memo(ProtectedRoute);
