'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useContentStats } from '@/hooks/useContent';
import StatCard from '@/components/ui/StatCard';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import ErrorState from '@/components/ui/ErrorState';
import { ROLES, ROUTES } from '@/utils/constants';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { HiOutlineDocumentText, HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClipboardDocumentCheck, HiOutlineRectangleStack } from 'react-icons/hi2';

export default function PrincipalDashboard() {
  const { user } = useAuth();
  const { stats, loading, error, refetch } = useContentStats();

  return (
    <DashboardLayout allowedRole={ROLES.PRINCIPAL}>
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">
            Welcome, <span className="gradient-text">{user?.name?.split(' ').pop()}</span>
          </h1>
          <p className="text-text-secondary">Overview of all content across the institution</p>
        </div>

        {loading ? (
          <SkeletonLoader type="card" count={4} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Content" value={stats.total} icon={HiOutlineDocumentText} color="primary" delay={0} />
            <StatCard label="Pending Review" value={stats.pending} icon={HiOutlineClock} color="warning" delay={100} />
            <StatCard label="Approved" value={stats.approved} icon={HiOutlineCheckCircle} color="success" delay={200} />
            <StatCard label="Rejected" value={stats.rejected} icon={HiOutlineXCircle} color="danger" delay={300} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Link href={ROUTES.PRINCIPAL.PENDING} className="glass-card glass-card-hover p-6 group block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/15 border border-warning/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiOutlineClipboardDocumentCheck className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Pending Approvals</h3>
                <p className="text-sm text-text-secondary">{stats.pending} items awaiting review</p>
              </div>
            </div>
          </Link>
          <Link href={ROUTES.PRINCIPAL.ALL_CONTENT} className="glass-card glass-card-hover p-6 group block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiOutlineRectangleStack className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">All Content</h3>
                <p className="text-sm text-text-secondary">Browse and manage all submissions</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
