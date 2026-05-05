'use client';

import { memo } from 'react';
import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute';

/**
 * Dashboard layout with sidebar for authenticated pages
 */
function DashboardLayout({ children, allowedRole }) {
  return (
    <ProtectedRoute allowedRole={allowedRole}>
      <div className="min-h-screen bg-[#030712]">
        <Sidebar />
        <main className="lg:pl-64">
          <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default memo(DashboardLayout);
